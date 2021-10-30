import "./index.scss";
import { Row, Col } from "antd";

import Freelancer from "../Freelancer";
import SearchResults from "../SearchResults";

ListFreelancer.propTypes = {};

function ListFreelancer() {
  return (
    <div className="list">
      <SearchResults />
      <div className="list__freelancer">
        <Row gutter={{ xs: 12, sm: 16, md: 24, lg: 32 }}>
          <Col className="mb-4 gutter-row" span={8}>
            <Freelancer />
          </Col>
          <Col className="mb-4 gutter-row" span={8}>
            <Freelancer />
          </Col>
          <Col className="mb-4 gutter-row" span={8}>
            <Freelancer />
          </Col>
          <Col className="mb-4 gutter-row" span={8}>
            <Freelancer />
          </Col>
          <Col className="mb-4 gutter-row" span={8}>
            <Freelancer />
          </Col>
          <Col className="mb-4 gutter-row" span={8}>
            <Freelancer />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ListFreelancer;
