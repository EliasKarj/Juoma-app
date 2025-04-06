import { color, transform } from "framer-motion";

const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100vw",
      minHeight: "100vh",
      padding: "30px",
      backgroundColor: "#0a1a3c",
      color: "white",
      textAlign: "center",
      fontSize: "16px",
      lineHeight: "1.6",
    },
    header: {
        position: "absolute",
        top: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "28px",
        color: "white",
        fontFamily: "'Poppins', sans-serif",
        zIndex: 999,
        margin: 0,
      },
      
  
    form: {
        marginTop: "30px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "10px",
      },
      
  
    input: {
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "16px",
      backgroundColor: "#f0f0f0",
    },
  
    button: {
      padding: "10px 16px",
      backgroundColor: "#1f6feb",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "15px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      transition: "background-color 0.3s",
    },
  
    smallButton: {
      padding: "6px 10px",
      margin: "2px",
      backgroundColor: "#3182ce",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.3s",
    },
  
    deleteButton: {
      padding: "6px 10px",
      margin: "2px",
      backgroundColor: "#e53e3e",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.3s",
    },
  
    table: {
      borderCollapse: "collapse",
      width: "100%",
      maxWidth: "900px",
      marginTop: "20px",
      backgroundColor: "#13294b",
      color: "white",
      borderRadius: "8px",
      overflow: "hidden",
    },
  
    list: {
      listStyleType: "none",
      paddingLeft: 0,
      textAlign: "left",
      margin: "0 auto",
      maxWidth: "300px",
    },
  
    listItem: {
      marginBottom: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  
    layoutWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "40px",
        marginTop: "30px",
        width: "100%",
        maxWidth: "1200px",
      },
      
  
      leftColumn: {
        flex: "1",
        maxWidth: "1000px",
      },
      
      rightColumn: {
        flex: "2",
        minWidth: "500px", 
      },
      timer: {
        position: "fixed",
        top: "10px",
        right: "20px",
        color: "white",
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        padding: "10px 14px",
        borderRadius: "10px",
        zIndex: 1000,
        textAlign: "center",
      },
      
      timerTime: {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "6px",
        letterSpacing: "1px",
        fontFamily: "monospace",
        minWidth: "120px",
        textAlign: "center",
      },
      
      timerControls: {
        display: "flex",
        justifyContent: "center",
        gap: "8px",
      },
      rankingBox: {
        position: "fixed", 
        top: "500px",
        right: "20px", 
        width: "220px",
        backgroundColor: "#13294b",
        borderRadius: "10px",
        padding: "16px",
        textAlign: "left",
        color: "white",
        fontSize: "15px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        zIndex: 999,
      },
      
      rankingList: {
        paddingLeft: "20px",
        margin: 0,
      },
      
      rankingItem: {
        marginBottom: "8px",
      },
      topNav: {
        position: "absolute",
        top: "70px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 998
      },
      topLink:{
        color: "white",
        backgroundColor: "#1f6feb",
        padding: "6px 12px",
        borderRadius: "8px",
        textDecoration: "none",
        fontSize: "15px",
        fontWeight: "bold",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        transition: "background-color 0.2s",
        fontFamily: "'Poppins', sans-serif",
      },
      rulesBox: {
        position: "fixed",
        top: "500px",
        left: "20px",
        width: "240px",
        backgroundColor: "#13294b",
        borderRadius: "10px",
        padding: "16px",
        textAlign: "left",
        color: "white",
        fontSize: "15px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        zIndex: 999,
      },
      
      rulesList: {
        paddingLeft: "10px",
        margin: 0,
      },
      
      rulesItem: {
        marginBottom: "8px",
      },
      rulesEditorBox: {
        backgroundColor: "#13294b",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        maxWidth: "600px",
        width: "100%",
        textAlign: "center",
        color: "white",
      },
      
      rulesEditorTitle: {
        fontSize: "26px",
        marginBottom: "20px",
      },
      
      rulesEditorList: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "20px",
      },
      
      rulesEditorItem: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        paddingLeft: "170px",
      },
      
      rulesEditorControls: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
      },
      roomUsersBox: {
        position: "fixed",
        top: "700px",
        right: "20px",
        width: "220px",
        backgroundColor: "#13294b",
        borderRadius: "10px",
        padding: "16px",
        textAlign: "left",
        color: "white",
        fontSize: "15px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        zIndex: 998,
      },
      
      
      
      
      
  };
  
  export default styles;
  