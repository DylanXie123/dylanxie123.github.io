import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import React, { MouseEventHandler, useContext } from "react";
import { ControllerContext } from "./controller";

const keys = ['1', '2', '3', '+', '*', '(', ')', '_{#?}', '^{#?}', '\\sin', '\\frac{#?}{#?}'];

export default function MathKeyboard() {
  const controller = useContext(ControllerContext);
  return (<Grid md={5}>
    {keys.map((s) =>
      <MathKey
        onclick={() => controller.add(s)}>
        {s}
      </MathKey>)}
    <MathKey
      onclick={() => controller.backspace()}>
      Backspace
    </MathKey>
    <MathKey
      onclick={() => controller.clear()}>
      Clear
    </MathKey>
  </Grid>);
}

interface MathKeyProp {
  onclick: MouseEventHandler
  children?: string
}

function MathKey(prop: MathKeyProp) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={prop.onclick}>
      {prop.children}
    </Button>
  );
}