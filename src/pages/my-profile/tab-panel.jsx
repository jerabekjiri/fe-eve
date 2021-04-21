
const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div {...other}>
        {value === index && children}
      </div>
    );
}

export default TabPanel
