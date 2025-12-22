import SharedConversation from "../models/SharedConversation"

export const createSharedConversation = async (data: any) => {
  return await SharedConversation.create(data)
}
