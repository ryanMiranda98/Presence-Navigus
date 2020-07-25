import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Pusher from "pusher-js";
import "./Page.css";

const Page = ({ token }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const hashCode = (s) =>
    s.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);

  function addMemberToUserList(member) {
    let userEl = document.createElement("div");
    userEl.id = "user_" + member.id;
    userEl.innerText = member.info.name.slice(0, 1);
    userEl.style.backgroundColor =
      "hsl(" + (hashCode(member.id) % 360) + ",70%,60%)";
    document.getElementById("user_list").appendChild(userEl);
  }

  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      forceTLS: true,
      authEndpoint: "http://localhost:5000/api/pages/pusher/auth",
      auth: { headers: { Authorization: `Bearer ${token}` } },
    });
    const channel = pusher.subscribe("presence-quickstart");
    channel.bind("pusher:subscription_succeeded", () => {
      channel.members.each((member) => {
        addMemberToUserList(member);
        setOnlineUsers(...onlineUsers, {
          id: member.id,
          name: member.info.name,
          email: member.info.email,
        });
      });

      // TODO: count members
      let members = [];
      channel.members.each((member) => {
        const user = {
          id: member.id,
          name: member.info.name,
          email: member.info.email,
        };
        members.push(user);
      });
      console.log(members);
    });
    channel.bind("pusher:member_added", (member) => {
      addMemberToUserList(member);
      setOnlineUsers(
        onlineUsers.concat({
          id: member.id,
          name: member.info.name,
          email: member.info.email,
        })
      );
    });
    channel.bind("pusher:member_removed", (member) => {
      const userEl = document.getElementById("user_" + member.id);
      userEl.parentNode.removeChild(userEl);
    });
  }, []);

  return (
    <div className="container">
      <div className="card page-card">
        <div className="d-flex justify-content-between">
          <p className="title">Document 1</p>
          <div className="d-flex top-bar">
            <div id="user_list" className="mx-3"></div>
            <button className="btn btn-sm btn-warning">Share</button>
          </div>
        </div>
        <hr />
        <div className="card-body">
          <div className="card-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
            ipsum fringilla, molestie eros ac, pharetra arcu. Integer non lacus
            est. Curabitur maximus, turpis non pretium tincidunt, augue odio
            maximus dui, ut imperdiet justo elit ut sapien. Proin eu tincidunt
            purus. Mauris tincidunt varius magna, quis dictum massa egestas et.
            Sed tempus lacus eget tempor pellentesque. Nam tempus luctus eros
            sed molestie. Nullam felis velit, blandit a porttitor ut, tincidunt
            id eros. Sed et luctus arcu, ut dignissim mauris. Morbi non urna
            erat. Proin scelerisque mollis nibh sed consectetur. Pellentesque
            tempus nisl lectus, quis sodales elit laoreet sed. Nulla facilisi.
            Orci varius natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Interdum et malesuada fames ac ante ipsum
            primis in faucibus. Curabitur aliquam eget urna in rutrum. Sed in
            nisl vitae eros feugiat varius ac ac nunc. Curabitur dignissim nulla
            sit amet augue fringilla, eget mollis eros consectetur. Phasellus
            non placerat nunc. Duis ac nunc eu ligula efficitur sagittis maximus
            id sapien. Mauris vestibulum porttitor iaculis. Fusce libero magna,
            tristique quis cursus vitae, varius vel nibh. Suspendisse pretium
            nibh nec ipsum aliquam sollicitudin.
          </div>
        </div>
      </div>
    </div>
  );
};

Page.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(Page);
