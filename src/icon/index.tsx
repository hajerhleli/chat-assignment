import React from 'react';

import {
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Languages,
  List,
  Pause,
  Play,
  SendHorizontal,
  SquareStack,
  Settings2,
  Timer,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';


export const availableIcons = {
  filter: Settings2,
  time: Timer,
  translation: Languages,
  list: List,
  mute: VolumeX,
  speech: Volume2,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronUp: ChevronUp,
  close: X,
  related: SquareStack,
  send: SendHorizontal,
  play: Play,
  pause: Pause,
};

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: keyof typeof availableIcons;
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
  ref?: React.Ref<SVGSVGElement>;
}

export const Icon = ({ name, color = 'white', onClick, ...props }: IconProps) => {
  const I = availableIcons[name];
  const className = props.className;

  return (
    <I
      {...props}
      className={`${color } h-6 w-6 ${className}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={props['aria-label']}
      onClick={onClick}
    />
  );
};
