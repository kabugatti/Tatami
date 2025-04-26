import { useState, useRef, useEffect } from "react";
import { CheckIcon, InfoIcon } from "lucide-react";

// Define the traits structure
type Trait = {
  name: string;
  selected: boolean;
  description?: string;
};

// Define props interface for the component
interface TraitsDropdownProps {
  modelId: string;
  onTraitToggle: (modelId: string, traitName: string, isSelected: boolean) => void;
}

// Component for the traits dropdown
export function TraitsDropdown({ modelId, onTraitToggle }: TraitsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [traits, setTraits] = useState<Trait[]>([
    { name: "Copy", selected: false, description: "Makes entity copyable" },
    { name: "Drop", selected: true, description: "Makes entity droppable" },
    { name: "Serde", selected: false, description: "Enables serialization" },
    { name: "IntrospectPacked", selected: true, description: "Enables introspection" },
    { name: "Debug", selected: true, description: "Enables debug output" },
  ]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTrait = (index: number) => {
    const newTraits = [...traits];
    newTraits[index].selected = !newTraits[index].selected;
    setTraits(newTraits);
    
    // Call parent handler if provided
    if (onTraitToggle) {
      onTraitToggle(modelId, newTraits[index].name, newTraits[index].selected);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-2 py-1 bg-black text-white rounded h-8"
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 7L12 15L4 7" />
        </svg>
        <span>Traits</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-52 bg-white border border-gray-200 rounded shadow-lg">
          <div className="py-1 px-3 font-medium text-black">Traits</div>
          
          <div className="max-h-60 overflow-y-auto">
            {traits.map((trait, index) => (
              <div 
                key={trait.name} 
                className="px-3 py-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer"
                onClick={() => toggleTrait(index)}
              >
                <div className="flex items-center gap-2">
                  <span>{trait.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    {trait.selected && <CheckIcon className="w-4 h-4" />}
                  </div>
                  {trait.description && (
                    <InfoIcon className="w-4 h-4 text-gray-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}