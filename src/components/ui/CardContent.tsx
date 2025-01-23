export default function CardContent({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="p-6 pt-0">
      {children}
    </div>
  )

}