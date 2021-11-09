// import { Spin } from "antd";
// import { useAppSelector } from "app/hooks";
import "./index.scss";
export default function Loading({ children }: any) {
  // const isLoading = useAppSelector((state) => state.app.isLoading);
  return (
    // <div className="loading">
    //   <Spin spinning={isLoading} size="large" >
    //     {children}
    //   </Spin>
    // </div>
    <div className="loader"></div>
  );
}
