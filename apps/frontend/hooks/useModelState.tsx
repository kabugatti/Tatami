"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useToast } from "./use-toast";
import { useDiagramStore } from "./useDiagramStore";
import { generateCairoCode } from "@/utils/generateCairoCode";
import { generateEntities } from "@/utils/generateEntities";
import { detectModelRelationships } from "@/utils/detectModelRelationships";
import { modelStateService } from "@/services/ModelStateService";

interface ModelStateType {
  code: string;
  editedCode: string;
  hasCustomEdits: boolean;
  loading: boolean;
  entities: any[];
  relationships: any[];
  updatedEditedCode: (newCode: string) => void;
  restoreInitialModel: () => void;
  saveChanges: () => void;
  confirmBeforeNavigation: () => boolean;
  entityPositions: Record<string, { x: number; y: number }>;
  setEntityPosition: (id: string, position: { x: number; y: number }) => void;
  activeSections: "code" | "diagram";
  setActiveSection: (section: "code" | "diagram") => void;
  updateCurrentModels: (updatedModels: any[]) => void;
}

const CreateModelStateContext = createContext<ModelStateType | undefined>(
  undefined
);

export const useModelStateContext = () => {
  const context = useContext(CreateModelStateContext);
  if (!context) {
    throw new Error("useModelStateContext is missing from context");
  }
  return context;
};

const LOCAL_STORAGE_KEY = "modelStatePersistence";

export const ModelStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { toast } = useToast();

  const entityPositions = useDiagramStore((state) => state.entityPositions);
  const setEntityPosition = useDiagramStore((state) => state.setEntityPosition);
  const activeSections = useDiagramStore((state) => state.activeSections);
  const setActiveSection = useDiagramStore((state) => state.setActiveSection);

  const [initialModels, setInitialModels] = useState<any[]>([]);
  const [currentModels, setCurrentModels] = useState<any[]>([]);
  const [code, setCode] = useState("");
  const [editedCode, setEditedCode] = useState("");
  const [hasCustomEdits, setHasCustomEdits] = useState(false);
  const [entities, setEntities] = useState<any[]>([]);
  const [relationships, setRelationships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingChanges, setPendingChanges] = useState(false);

  const initializedRef = useRef(false);

  useEffect(() => {
    const persisted =
      typeof window !== "undefined"
        ? localStorage.getItem(LOCAL_STORAGE_KEY)
        : null;

    if (persisted) {
      try {
        const parsed = JSON.parse(persisted);
        if (parsed.models) {
          setInitialModels(parsed.models);
          setCurrentModels(parsed.models);
          const genCode = generateCairoCode(parsed.models);
          setCode(genCode);
          setEditedCode(parsed.editedCode ?? genCode);
          setEntities(generateEntities(parsed.models));
          setRelationships(detectModelRelationships(parsed.models));
          setHasCustomEdits(parsed.hasCustomEdits ?? false);
          setPendingChanges(parsed.pendingChanges ?? false);
          setLoading(false);
          initializedRef.current = true;
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }

    if (!initializedRef.current) {
      const subscribe = modelStateService.models$.subscribe((models) => {
        setInitialModels(models);
        setCurrentModels(models);
      });

      modelStateService.initialize();
      return () => subscribe.unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          editedCode,
          hasCustomEdits,
          pendingChanges,
          models: currentModels,
        })
      );
    }
  }, [editedCode, hasCustomEdits, pendingChanges, currentModels]);

  useEffect(() => {
    if (!hasCustomEdits) {
      const genCode = generateCairoCode(currentModels);
      setCode(genCode);
      setEditedCode(genCode);
    }
  }, [currentModels, hasCustomEdits]);

  useEffect(() => {
    setEntities(generateEntities(currentModels));
    setRelationships(detectModelRelationships(currentModels));
  }, [currentModels]);

  const updateEditedCode = (newCode: string) => {
    setEditedCode(newCode);
    setHasCustomEdits(true);
    setPendingChanges(true);
  };

  const restoreInitialModel = () => {
    const restoredCode = generateCairoCode(initialModels);
    setCode(restoredCode);
    setEditedCode(restoredCode);
    setEntities(generateEntities(initialModels));
    setRelationships(detectModelRelationships(initialModels));
    setHasCustomEdits(false);
    setPendingChanges(false);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    toast({
      title: "Revertido",
      description: "Modelo original restaurado",
      duration: 2000,
    });
  };

  const saveChanges = () => {
    currentModels.forEach((model) => {
      modelStateService.updateModel(model.id, model);
    });
    setInitialModels(currentModels);
    setHasCustomEdits(false);
    setPendingChanges(false);
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        editedCode,
        hasCustomEdits: false,
        pendingChanges: false,
        models: currentModels,
      })
    );

    toast({
      title: "Guardado",
      description: "Cambios aplicados a los modelos",
      duration: 2000,
    });
  };

  const confirmBeforeNavigation = () => {
    if (pendingChanges) {
      return confirm("Tienes cambios sin guardar. ¿Deseas continuar?");
    }
    return true;
  };
  const modelStateValue: ModelStateType = {
    code,
    editedCode,
    hasCustomEdits,
    loading,
    entities,
    relationships,
    updatedEditedCode: updateEditedCode,
    restoreInitialModel,
    saveChanges,
    confirmBeforeNavigation,
    entityPositions,
    setEntityPosition,
    activeSections,
    setActiveSection,
    updateCurrentModels: (updatedModels: any[]) => {
      setCurrentModels(updatedModels);
      const genCode = generateCairoCode(updatedModels);
      setEntities(generateEntities(updatedModels));
      setRelationships(detectModelRelationships(updatedModels));

      if (!hasCustomEdits) {
        setCode(genCode);
        setEditedCode(genCode);
      }
      setPendingChanges(true);
    },
  };

  return (
    <CreateModelStateContext.Provider value={modelStateValue}>
      {children}
    </CreateModelStateContext.Provider>
  );
};
