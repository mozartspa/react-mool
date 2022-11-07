import { ResourceDefinition } from "@react-mool/core"
import { Review } from "../gqless"
import { ReviewCreate } from "./ReviewCreate"
import { ReviewDetail } from "./ReviewDetail"
import { ReviewEdit } from "./ReviewEdit"
import { ReviewList } from "./ReviewList"

export const ReviewResource: ResourceDefinition<Review> = {
  name: "review",
  icon: "package",
  create: ReviewCreate,
  edit: ReviewEdit,
  detail: ReviewDetail,
  list: ReviewList,
  recordName: (record) => record.id ?? "",
}
