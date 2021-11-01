import { Result, Button } from "antd";
import { useHistory } from "react-router";

function NotFound() {
  const history = useHistory();
  const backHome = (e: any) => {
    history.push("/");
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={backHome}>Back Home</Button>}
    />
  );
}

export default NotFound;
