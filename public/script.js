
import { sdk } from "https://esm.sh/@farcaster/miniapp-sdk";
import { mountDiffly } from "./Diffly-ui.js";
window.addEventListener("load", async () => {
  const root=document.getElementById("app");
  let isMini=false; try{isMini=await sdk.isInMiniApp();}catch{}
  mountDiffly(root,{isMini});
  try{await sdk.actions.ready();}catch{}
});
