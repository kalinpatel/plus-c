// styled.d.ts
import "styled-components";
import { Theme } from "./brand/theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
