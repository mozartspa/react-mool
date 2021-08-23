import { Detail, DetailHeader } from "@react-mool/eui"

export const ProductDetail = () => {
  return (
    <Detail>
      {({ record }) => (
        <>
          <DetailHeader />
          <pre>{JSON.stringify(record, null, 2)}</pre>
        </>
      )}
    </Detail>
  )
}
