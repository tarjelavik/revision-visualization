export default interface Edge { 
  id: string; 
  source: string; 
  target: string; 
  label: string, 
  type?: string, 
  color?: string, 
  size?: number, 
  actionId?: number, 
  count?: number 
};