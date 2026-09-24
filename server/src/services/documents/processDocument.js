import pdfParse from 'pdf-parse';

export async function extractTextFromFile(fileBuffer, originalName = '') {
  if (!fileBuffer) return '';

  const lowerName = (originalName || '').toLowerCase();

  // If PDF
  if (lowerName.endsWith('.pdf')) {
    try {
      const data = await pdfParse(fileBuffer);
      return data.text || '';
    } catch (err) {
      console.warn('PDF parsing error, falling back to raw buffer string:', err.message);
      return fileBuffer.toString('utf-8');
    }
  }

  // If text or markdown or doc
  return fileBuffer.toString('utf-8');
}

export function extractClausesFromText(fullText) {
  if (!fullText) {
    return [
      {
        section: 'General Terms',
        title: 'Agreement Provisions',
        pageNumber: 1,
        text: 'Standard agreement text provided.'
      }
    ];
  }

  const lines = fullText.split('\n').map(l => l.trim()).filter(Boolean);
  const clauses = [];

  let currentSection = 'Clause 1';
  let currentTitle = 'Terms & Conditions';
  let currentParagraphs = [];
  let pageNumber = 1;

  for (const line of lines) {
    // Check if line looks like a Section/Clause heading (e.g. "1. Term", "Section 2:", "Clause 3")
    const sectionMatch = line.match(/^(?:Section|Clause|Article|\d+[\.\)])\s*([0-9\.]*)\s*[:\-\.]?\s*(.*)/i);
    
    if (sectionMatch && currentParagraphs.length > 0) {
      clauses.push({
        section: currentSection,
        title: currentTitle,
        pageNumber: Math.min(pageNumber, 10),
        text: currentParagraphs.join(' ')
      });
      currentParagraphs = [];
      pageNumber++;
      currentSection = `Section ${sectionMatch[1] || clauses.length + 1}`;
      currentTitle = sectionMatch[2] || 'Agreement Term';
    } else if (sectionMatch) {
      currentSection = `Section ${sectionMatch[1] || clauses.length + 1}`;
      currentTitle = sectionMatch[2] || 'Agreement Term';
    } else {
      currentParagraphs.push(line);
    }
  }

  if (currentParagraphs.length > 0) {
    clauses.push({
      section: currentSection,
      title: currentTitle,
      pageNumber: Math.min(pageNumber, 10),
      text: currentParagraphs.join(' ')
    });
  }

  return clauses.length > 0 ? clauses.slice(0, 10) : [
    {
      section: 'Section 1',
      title: 'Uploaded Agreement Text',
      pageNumber: 1,
      text: fullText.slice(0, 500)
    }
  ];
}
