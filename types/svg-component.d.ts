
declare module '~virtual/svg-component' {
  const SvgIcon: import("vue").DefineComponent<{
      name: {
          type: import("vue").PropType<"empty-status" | "hanbao">;
          default: string;
          required: true;
      };
  }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
      name: {
          type: import("vue").PropType<"empty-status" | "hanbao">;
          default: string;
          required: true;
      };
  }>>, {
      name: "empty-status" | "hanbao";
  }>;
  export const svgNames: ["empty-status" , "hanbao"];
  export type SvgName = "empty-status" | "hanbao";
  export default SvgIcon;
}
