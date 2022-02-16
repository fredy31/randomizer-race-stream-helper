export default function itemZoom(state = "100", action:any) {
    switch (action.type) {
      case "ITEMZOOM":
        return action.payload;
      default:
        return state;
    }
  }