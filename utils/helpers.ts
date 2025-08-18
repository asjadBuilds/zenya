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

const formatChat = (data:any)=>{
  // if (!data || typeof data !== 'object') return '<p>No information available.</p>';

  let html = '';

  // Heading (Name)
  if (data.name) {
    html += `<h2>${data.name}</h2>`;
  }

  // Description or Usage
  if (data.description) {
    html += `<p><strong>Description:</strong> ${data.description}</p>`;
  } else if (data.usage) {
    html += `<p><strong>Usage:</strong> ${data.usage}</p>`;
  }

  // Common Symptoms (for disease)
  if (Array.isArray(data.common_symptoms)) {
    html += `<h3>Common Symptoms:</h3><ul>`;
    data.common_symptoms.forEach((symptom:string) => {
      html += `<li>${symptom}</li>`;
    });
    html += `</ul>`;
  }

  // Possible Causes (for disease)
  if (Array.isArray(data.possible_causes)) {
    html += `<h3>Possible Causes:</h3><ul>`;
    data.possible_causes.forEach((cause:string) => {
      html += `<li>${cause}</li>`;
    });
    html += `</ul>`;
  }

  // Common Side Effects (for medicine)
  if (Array.isArray(data.common_side_effects)) {
    html += `<h3>Common Side Effects:</h3><ul>`;
    data.common_side_effects.forEach((effect:string) => {
      html += `<li>${effect}</li>`;
    });
    html += `</ul>`;
  }

  // Precautions (for medicine)
  if (Array.isArray(data.precautions)) {
    html += `<h3>Precautions:</h3><ul>`;
    data.precautions.forEach((item:string) => {
      html += `<li>${item}</li>`;
    });
    html += `</ul>`;
  }

  // Disclaimer
  if (data.disclaimer) {
    html += `<p><em>${data.disclaimer}</em></p>`;
  }

  return html;
}

const initialChat = {
  participant:'receiver',
  data:'Hello User, I am Zenya Bot. You can ask me about any medicine or disease. I will provide you general information with neutral facts and without biased information and advice.'
}


export {getNested, toggleSortFor, createSlug, formatChat, initialChat}