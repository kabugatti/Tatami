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

// 💡 CORREGIDO: era `hasCustomsEdits` (incorrecto), debe ser `hasCustomEdits`
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
    const sub = modelStateService.models$.subscribe((models) => {
      if (!initializedRef.current) {
        setInitialModels(models);
        initializedRef.current = true;
      }

      setCurrentModels(models);
      const genCode = generateCairoCode(models);

      if (!hasCustomEdits) {
        setCode(genCode);
        setEditedCode(genCode);
      }

      setEntities(generateEntities(models));
      setRelationships(detectModelRelationships(models));
      setLoading(false);
    });

    modelStateService.initialize();

    return () => sub.unsubscribe();
  }, [hasCustomEdits]);

  useEffect(() => {
    const persisted = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (persisted) {
      try {
        const parsed = JSON.parse(persisted);
        if (parsed.editedCode) setEditedCode(parsed.editedCode);
        if (typeof parsed.hasCustomEdits === "boolean")
          setHasCustomEdits(parsed.hasCustomEdits);
        if (typeof parsed.pendingChanges === "boolean")
          setPendingChanges(parsed.pendingChanges);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        editedCode,
        hasCustomEdits,
        pendingChanges,
      })
    );
  }, [editedCode, hasCustomEdits, pendingChanges]);

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
    localStorage.removeItem(LOCAL_STORAGE_KEY);
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
  };

  return (
    <CreateModelStateContext.Provider value={modelStateValue}>
      {children}
    </CreateModelStateContext.Provider>
  );
};
