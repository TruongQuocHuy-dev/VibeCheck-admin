interface WordBadgeProps {
  type: 'exact' | 'contains' | 'regex'
}

export function WordBadge({ type }: WordBadgeProps) {
  const styles = {
    exact: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    contains: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    regex: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  }

  const labels = {
    exact: 'Khớp hoàn toàn',
    contains: 'Chứa cụm từ',
    regex: 'Biểu thức (Regex)',
  }

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[type]}`}>
      {labels[type]}
    </span>
  )
}
