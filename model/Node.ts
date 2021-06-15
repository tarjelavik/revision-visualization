export default interface Node { 
  id: string; 
  label: string, 
  type?: string, 
  color?: string, 
  class?: string, 
  image?: {
    url: string
  } 
};