export default function CardTitle({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <h3 className="text-lg font-semibold leading-none tracking-tight">
      {children}
    </h3>
  )
}