export interface TopBarButton {
  label: string;
  icon: string;
  type: 'primary' | 'default' | 'dashed' | 'text' | 'link';
  danger?: boolean;
  ghost?: boolean;
  action: () => void;
  onClick?: () => void;
}
