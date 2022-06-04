import { useConversation } from "../context/ConversationsProvider";
import OpenConversaiton from "./OpenConversaiton";
import Sidebar from "./Sidebar";
const Dashboard = ({ id }) => {

  const {selectedConversation} = useConversation()
  return (
    <div
      className="d-flex"
      style={{ height: "100vh" }}
    >
      <Sidebar id={id} />
      {selectedConversation && (
        <OpenConversaiton />
      )}
    </div>
  );
};

export default Dashboard;
