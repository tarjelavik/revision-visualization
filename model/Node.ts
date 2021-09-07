export default interface Node { 
  id: string; 
  label: string, 
  type?: string, 
  color?: string, 
  class?: string, 
  x?: number,
  y?: number,
  image?: {
    url: string
  } 
};