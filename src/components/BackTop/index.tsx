import { UpOutlined } from "@ant-design/icons";
import { BackTop } from "antd";
import "./index.scss";
export default function BackToTop() {
  // const style = {
  //   height: 40,
  //   width: 40,
  //   lineHeight: "40px",
  //   borderRadius: 4,
  //   backgroundColor: "#2e3fe5",
  //   color: "#fff",
  //   textAlign: "center",
  //   fontSize: 14,
  // };
  return (
    <BackTop visibilityHeight={1500}>
      {/* @ts-ignore */}
      <div className="flex items-center justify-center style-back">
        <UpOutlined />
      </div>
    </BackTop>
  );
}
