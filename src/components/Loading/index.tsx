import { Spin } from "antd";
import { useAppSelector } from "app/hooks";
import './index.scss'
export default function LoadingComp({ children }: any) {
  const isLoading = useAppSelector((state) => state.app.isLoading);
  return (
    <div className="loading">
      <Spin spinning={false} size="large">
        {children}
      </Spin>
    </div>
  );
}
