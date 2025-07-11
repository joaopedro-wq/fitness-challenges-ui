export interface TopBarButton {
  label: string;
  icon: string;
  type: 'primary' | 'default' | 'dashed' | 'text';
  action: () => void;
}