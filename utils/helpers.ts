import { Column } from "@/models/reviewCols"

function getNested(obj: any, path?: string) {
  if (!path) return undefined
  return path.split('.').reduce((acc: any, key: string) => (acc ? acc[key] : undefined), obj)
}


const toggleSortFor = <T>(
  col: Column<T>,
  setPage: (page: number) => void,
  setSort: any
)=> {
  const id = col.id ?? col.accessorKey ?? null;
  if (!id) return;

  setPage(1);
  setSort((prev: { id: string | null; desc: boolean }) => ({
  id,
  desc: prev.id === id ? !prev.desc : false
}));
}

const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/\//g, "-")       // Replace slashes
    .replace(/\s+/g, "-")      // Replace spaces
    .replace(/[^a-z0-9-]/g, ""); // Remove special chars
};




export {getNested, toggleSortFor, createSlug}