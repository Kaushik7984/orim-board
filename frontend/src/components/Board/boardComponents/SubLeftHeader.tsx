import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BallotIcon from "@mui/icons-material/Ballot";
import InterestsIcon from "@mui/icons-material/Interests";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import StyleIcon from "@mui/icons-material/Style";
import { motion } from "framer-motion";
import { useState } from "react";

const SubLeftHeader = () => {
  const [open, setOpen] = useState(false);

  const items = [
    {
      name: "Hide apps",
      icon: <KeyboardArrowRightIcon />,
    },
    {
      name: "Timer",
      icon: <AccessTimeIcon />,
    },
    {
      name: "Voting",
      icon: <BallotIcon />,
    },
    {
      name: "Talktrack: Create & watch board recordings",
      icon: <RadioButtonCheckedIcon />,
    },
    {
      name: "Estimate",
      icon: <StyleIcon />,
    },
  ];

  const icon = open ? <KeyboardDoubleArrowDownIcon /> : <InterestsIcon />;

  return (
    <div
      className="flex flex-row rounded-md bg-white p-1 items-center transition-all overflow-hidden"
      style={{ boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.3)" }}
    >
      {open && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-row items-center"
        >
          {items.map((item, i) => (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={item.name}
              onClick={() => item.name === "Hide apps" && setOpen(!open)}
              className="p-2 rounded-md hover:bg-[#dde4fc] duration-200 cursor-pointer"
            >
              {item.icon}
            </motion.div>
          ))}
        </motion.div>
      )}
      <div
        onClick={() => setOpen(!open)}
        className="p-2 rounded-md hover:bg-[#dde4fc] duration-200 cursor-pointer"
      >
        {icon}
      </div>
    </div>
  );
};

export default SubLeftHeader;
