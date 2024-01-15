import {
  FiEdit,
  FiChevronDown,
  FiTrash,
  FiShare,
  FiPlusSquare,
  FiGlobe
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/router";
import { IntlProvider, useIntl } from "react-intl";

const LangSelector = () => {
  const Name2CountryCode: { [key: string]: string } = {
    "English": "en",
    "Tiếng Việt": "vi",
  };
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const locale: string = router.locale === "en" ? "English" : "Tiếng Việt"
  const [display, setDisplay]= useState<string>(locale)
  const handleOnClick= (text: string) => {
    setOpen(false); 
    setDisplay(text); 
    router.push(router.asPath, router.asPath, { locale: Name2CountryCode[text]})
  }
  return (
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center z-50 gap-4 px-3 py-1 rounded-lg w-20 text-indigo-50 bg-blue-700 hover:bg-indigo-500 transition-colors"
        >
           <FiGlobe size={30}/>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2  z-50  rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-full overflow-hidden"
        >
          <Option handle={handleOnClick} Icon={FiEdit} text="English" />
          <Option handle={handleOnClick} Icon={FiPlusSquare} text="Tiếng Việt" />
        </motion.ul>
      </motion.div>
  );
};

const Option = ({ text, Icon, handle }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => { handle(text) }}
      className="flex z-50 items-center gap-2 w-full py-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

export default LangSelector;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};