import { ExtractRouteParams } from "react-router"

type X = ExtractRouteParams<"/ciao/:id", string>

export function createResourceRouter() {}

/*
productRouter.view({ id: 5 })
productRouter.list()
productRouter.edit({ id: 5 })
productRouter.create()


type RouteRule<Params> = (params: Params) => string

const xxx = <Route path="/contact/:id" render={({ match }) => <span id={match.params.id} />} />
*/
