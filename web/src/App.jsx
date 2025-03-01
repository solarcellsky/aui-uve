import {
  Attachments,
  Bubble,
  Conversations,
  Prompts,
  Sender,
  Suggestion,
  Welcome,
  useXAgent,
  useXChat,
} from "@ant-design/x";
import { createStyles } from "antd-style";
import React, { useEffect } from "react";
import {
  CloudUploadOutlined,
  EllipsisOutlined,
  PaperClipOutlined,
  PlusOutlined,
  ShareAltOutlined,
  OpenAIFilled,
  UserOutlined,
  SyncOutlined,
  CopyOutlined,
  GlobalOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Badge, Button, Flex, Space } from "antd";
import FMT from "./assets/fmt.webp";
import X from "./assets/x.svg";
import { gwAiApi } from "@/apis";

const suggestions = [
  {
    label: "Write a report",
    value: "report",
  },
  {
    label: "Draw a picture",
    value: "draw",
  },
  {
    label: "Check some knowledge",
    value: "knowledge",
    icon: <OpenAIFilled />,
    children: [
      {
        label: "About React",
        value: "react",
      },
      {
        label: "About Ant Design",
        value: "antd",
      },
    ],
  },
];

const defaultConversationsItems = [
  {
    key: "0",
    label: "Hello World",
  },
];
const useStyle = createStyles(({ token, css }) => {
  return {
    layout: css`
      width: 100vw;
      height: 100vh;
      display: flex;
      background: ${token.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${token.fontFamily}, sans-serif;
      .ant-prompts {
        color: ${token.colorText};
      }
    `,
    menu: css`
      background: ${token.colorBgLayout}80;
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
    `,
    conversations: css`
      padding: 0 12px;
      flex: 1;
      overflow-y: auto;
    `,
    chat: css`
      height: 100%;
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding: ${token.paddingLG}px;
      gap: 16px;
    `,
    messages: css`
      flex: 1;
    `,
    placeholder: css`
      padding-top: 32px;
    `,
    sender: css`
      box-shadow: ${token.boxShadow};
    `,
    logo: css`
      display: flex;
      height: 72px;
      align-items: center;
      justify-content: start;
      padding: 0 24px;
      box-sizing: border-box;

      img {
        width: 24px;
        height: 24px;
        display: inline-block;
      }

      span {
        display: inline-block;
        margin: 0 8px;
        font-weight: bold;
        color: ${token.colorText};
        font-size: 16px;
      }
    `,
    addBtn: css`
      background: #1677ff0f;
      border: 1px solid #1677ff34;
      width: calc(100% - 24px);
      margin: 0 12px 24px 12px;
    `,
  };
});

const roles = {
  ai: {
    placement: "start",
    typing: {
      step: 5,
      interval: 20,
    },
    styles: {
      content: {
        borderRadius: 8,
      },
    },
  },
  local: {
    placement: "end",
    typing: {
      step: 5,
      interval: 20,
    },
    styles: {
      content: {
        background: "#eff6ff",
        borderRadius: 8,
      },
    },
  },
};
const Independent = () => {
  // ==================== Style ====================
  const { styles } = useStyle();

  // ==================== State ====================
  const [headerOpen, setHeaderOpen] = React.useState(false);
  const [content, setContent] = React.useState("");
  const [conversationsItems, setConversationsItems] = React.useState(
    defaultConversationsItems
  );
  const [activeKey, setActiveKey] = React.useState(
    defaultConversationsItems[0].key
  );
  const [attachedFiles, setAttachedFiles] = React.useState([]);

  const aiAvatar = {
    color: "#f56a00",
    backgroundColor: "#fde3cf",
  };
  const localAvatar = {
    color: "#fff",
    backgroundColor: "#87d068",
  };

  // ==================== Runtime ====================
  const [agent] = useXAgent({
    request: async ({ message }, { onSuccess, onError }) => {
      gwAiApi
        .deepSeek({ message })
        .then((res) => {
          onSuccess(res.data);
        })
        .catch((error) => {
          onError(error.message);
        });
    },
  });

  const { onRequest, messages, setMessages } = useXChat({
    agent,
  });
  useEffect(() => {
    if (activeKey !== undefined) {
      setMessages([]);
    }
  }, [activeKey]);

  // ==================== Event ====================
  const onSubmit = (nextContent) => {
    if (!nextContent) return;
    onRequest(nextContent);
    setContent("");
  };
  const onAddConversation = () => {
    setConversationsItems([
      ...conversationsItems,
      {
        key: `${conversationsItems.length}`,
        label: `New Conversation ${conversationsItems.length}`,
      },
    ]);
    setActiveKey(`${conversationsItems.length}`);
  };
  const onConversationClick = (key) => {
    setActiveKey(key);
  };
  const handleFileChange = (info) => setAttachedFiles(info.fileList);

  // ==================== Nodes ====================
  const placeholderNode = (
    <Space direction="vertical" size={16} className={styles.placeholder}>
      <Welcome
        variant="borderless"
        icon={<img src={FMT} draggable={false} alt="fmt" />}
        title="Hello, I'm your AI assistant"
        description="Base on Ant Design, AGI product interface solution, create a better intelligent vision~"
        extra={
          <Space>
            <Button icon={<ShareAltOutlined />} />
            <Button icon={<EllipsisOutlined />} />
          </Space>
        }
      />
    </Space>
  );
  const items = messages.map(({ id, message, status }) => ({
    key: id,
    loading: status === "ai",
    header: status === "local" ? "You" : "DeepSeek",
    role: status === "local" ? "local" : "ai",
    content: message,
    avatar: {
      icon: status === "local" ? <UserOutlined /> : <OpenAIFilled />,
      style: status === "local" ? localAvatar : aiAvatar,
    },
    footer: (
      <Space>
        <Button type="text" size="small" icon={<SyncOutlined />} />
        <Button type="text" size="small" icon={<CopyOutlined />} />
      </Space>
    ),
  }));

  // const items = messages.map(({ id, message, status }) => {
  //   console.log(id, message, status);
  // });
  const attachmentsNode = (
    <Badge dot={attachedFiles.length > 0 && !headerOpen}>
      <Button
        type="text"
        icon={<PaperClipOutlined />}
        onClick={() => setHeaderOpen(!headerOpen)}
      />
    </Badge>
  );
  const senderHeader = (
    <Sender.Header
      title="Attachments"
      open={headerOpen}
      onOpenChange={setHeaderOpen}
      styles={{
        content: {
          padding: 0,
        },
      }}
    >
      <Attachments
        beforeUpload={() => false}
        items={attachedFiles}
        onChange={handleFileChange}
        placeholder={(type) =>
          type === "drop"
            ? {
                title: "Drop file here",
              }
            : {
                icon: <CloudUploadOutlined />,
                title: "Upload files",
                description: "Click or drag files to this area to upload",
              }
        }
      />
    </Sender.Header>
  );
  const logoNode = (
    <div className={styles.logo}>
      <img src={X} draggable={false} alt="logo" />
    </div>
  );

  // ==================== Render =================
  return (
    <div className={styles.layout}>
      <div className={styles.menu}>
        {/* 🌟 Logo */}
        {logoNode}
        {/* 🌟 添加会话 */}
        <Button
          onClick={onAddConversation}
          type="link"
          className={styles.addBtn}
          icon={<PlusOutlined />}
        >
          New Conversation
        </Button>
        {/* 🌟 会话管理 */}
        <Conversations
          items={conversationsItems}
          className={styles.conversations}
          activeKey={activeKey}
          onActiveChange={onConversationClick}
        />
      </div>
      <div className={styles.chat}>
        {/* 🌟 消息列表 */}
        <Bubble.List
          items={
            items.length > 0
              ? items
              : [
                  {
                    content: placeholderNode,
                    variant: "borderless",
                  },
                ]
          }
          roles={roles}
          className={styles.messages}
        />
        {/* 🌟 输入框 */}
        <Suggestion
          items={suggestions}
          onSelect={(itemVal) => {
            setContent(`[${itemVal}]:`);
          }}
        >
          {({ onTrigger, onKeyDown }) => {
            return (
              <Sender
                value={content}
                header={senderHeader}
                onSubmit={onSubmit}
                onChange={(nextVal) => {
                  if (nextVal === "/") {
                    onTrigger();
                  } else if (!nextVal) {
                    onTrigger(false);
                  }
                  setContent(nextVal);
                }}
                onKeyDown={onKeyDown}
                prefix={attachmentsNode}
                loading={agent.isRequesting()}
                className={styles.sender}
                placeholder="输入 / 获取建议"
              />
            );
          }}
        </Suggestion>
        {/* 🌟 开启深度思考 搜索 */}
        <Flex gap="small" wrap>
          <Button
            type="default"
            size="small"
            shape="round"
            icon={<ThunderboltOutlined />}
            autoInsertSpace={false}
          >
            DeepThink
          </Button>
          <Button
            type="default"
            size="small"
            shape="round"
            icon={<GlobalOutlined />}
            autoInsertSpace
          >
            Search
          </Button>
        </Flex>
      </div>
    </div>
  );
};
export default Independent;
