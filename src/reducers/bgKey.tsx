export default function bgKey(state = "#111111", action:any) {
    switch (action.type) {
      case "CURRENT_CATEG":
        return action.payload;
      default:
        return state;
    }
  }