import React, { useState, useRef, useEffect } from 'react'; 
import { ChevronDown, Check } from 'lucide-react';

interface TraitsDropdownProps {
  modelId: string;
  onTraitToggle: (modelId: string, traitId: string, isEnabled: boolean) => void;
}

interface Trait {
  id: string;
  name: string;
  icon: string;
}

const availableTraits: Trait[] = [
  { id: '1', name: 'Copy', icon: '👁️' },
  { id: '2', name: 'Drop', icon: '🔍' },
  { id: '3', name: 'Serde', icon: '💻' },
  { id: '4', name: 'IntrospectPacked', icon: '📁' },
  { id: '5', name: 'Debug', icon: '📁📁' }
];

const TuneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1.5">
    <g clipPath="url(#clip0_917_310)">
      <path d="M3 17V19H9V17H3ZM3 5V7H13V5H3ZM13 21V19H21V17H13V15H11V21H13ZM7 9V11H3V13H7V15H9V9H7ZM21 13V11H11V13H21ZM15 9H17V7H21V5H17V3H15V9Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip0_917_310">
        <rect width="24" height="24" fill="currentColor"/>
      </clipPath>
    </defs>
  </svg>
);

const TraitsDropdown: React.FC<TraitsDropdownProps> = ({ modelId, onTraitToggle }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedTraits, setSelectedTraits] = useState<string[]>(['1', '2', '3']);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    selectedTraits.forEach(traitId => onTraitToggle(modelId, traitId, true));
  }, [modelId, onTraitToggle]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTrait = (traitId: string) => {
    const isSelected = selectedTraits.includes(traitId);
    setSelectedTraits(isSelected ? selectedTraits.filter(id => id !== traitId) : [...selectedTraits, traitId]);
    onTraitToggle(modelId, traitId, !isSelected);
  };



  return (
    <div className="relative inline-block flex-wrap" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative hover:bg-foreground/95 bg-foreground text-background font-medium gap-1 flex items-center justify-center h-8 px-3 border border-neutral rounded transition-colors"
      >
        <span className="truncate mr-1">Traits</span>
        <ChevronDown className="h-4 w-4 ml-1" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-56 bg-background border border-neutral rounded shadow-lg z-20">
          <div className="px-4 py-1 border-b border-neutral font-medium flex items-center">
            <TuneIcon />
            <span>Traits</span>
          </div>
          <div className="py-0 max-h-72 overflow-y-auto">
            {availableTraits.map((trait) => (
              <div 
                key={trait.id}
                className="flex items-center justify-between px-4 py-1.5 hover:bg-neutral-100 cursor-pointer"
                onClick={() => toggleTrait(trait.id)}
              >
                <div className="flex items-center">
                  <span className="mr-2">{trait.icon}</span>
                  <span className="text-sm">{trait.name}</span>
                </div>
                <div className="w-4 h-4 flex items-center justify-center border border-neutral rounded bg-foreground text-background">
                  {selectedTraits.includes(trait.id) && <Check className="h-3 w-3" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TraitsDropdown;
