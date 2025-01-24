export default function CardHeader({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col space-y-1.5 p-6">
      {children}
    </div>
  )
}