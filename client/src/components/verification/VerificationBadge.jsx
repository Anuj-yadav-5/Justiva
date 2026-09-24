import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, HelpCircle, AlertOctagon, ShieldCheck } from 'lucide-react';

export const VerificationBadge = ({ status, size = 'md', showLabel = true, className = '' }) => {
  const configs = {
    SUPPORTED: {
      label: 'SUPPORTED',
      description: 'Directly supported by retrieved clause or statute text.',
      className: 'badge-supported',
      icon: CheckCircle,
      textColor: 'text-emerald-700',
      dotColor: 'bg-emerald-500'
    },
    PARTIALLY_SUPPORTED: {
      label: 'PARTIALLY SUPPORTED',
      description: 'Part of the claim is supported, but secondary elements lack direct textual verification.',
      className: 'badge-partially-supported',
      icon: AlertTriangle,
      textColor: 'text-amber-700',
      dotColor: 'bg-amber-500'
    },
    CONTRADICTED: {
      label: 'CONTRADICTED',
      description: 'The claim directly conflicts with authoritative contract terms or statutory law.',
      className: 'badge-contradicted',
      icon: XCircle,
      textColor: 'text-red-700',
      dotColor: 'bg-red-500'
    },
    UNSUPPORTED: {
      label: 'UNSUPPORTED',
      description: 'No matching textual evidence was found in the document or legal authorities.',
      className: 'badge-unsupported',
      icon: AlertOctagon,
      textColor: 'text-orange-700',
      dotColor: 'bg-orange-500'
    },
    INSUFFICIENT_INFORMATION: {
      label: 'INSUFFICIENT INFORMATION',
      description: 'Evidence is insufficient to reach a reliable determination. Abstention triggered.',
      className: 'badge-insufficient',
      icon: HelpCircle,
      textColor: 'text-slate-700',
      dotColor: 'bg-slate-500'
    },
    REVIEW_REQUIRED: {
      label: 'REVIEW REQUIRED',
      description: 'Ambiguity, statutory tension, or factual uncertainty requires attorney evaluation.',
      className: 'badge-review-required',
      icon: ShieldCheck,
      textColor: 'text-purple-700',
      dotColor: 'bg-purple-500'
    }
  };

  const current = configs[status] || configs['SUPPORTED'];
  const Icon = current.icon;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1 font-semibold tracking-wider',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold tracking-wide',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-bold'
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };

  return (
    <span
      title={current.description}
      className={`inline-flex items-center rounded-full transition-all duration-200 uppercase font-mono ${current.className} ${sizeClasses[size]} ${className}`}
    >
      <Icon size={iconSizes[size]} className="shrink-0" />
      {showLabel && <span>{current.label}</span>}
    </span>
  );
};

export default VerificationBadge;
