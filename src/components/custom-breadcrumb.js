import React from 'react';
import { Box, Link } from '@mui/material';
import { useRouter } from 'next/router';
import { ArrowLeft as ArrowLeftIcon } from '../icons/arrow-left'

export const CustomBreadcrumb = (props) => {
    const router = useRouter();
    return <>
        <Box sx={{
            mt: "40px",
            height: '30px',
            width: '100%',
            paddingTop: "10px",
            paddingBottom: "60px",
            color: '#999',
            textDecoration: "none",
            fontWeight: "bold",
            '& a': {
                textDecoration: "none",
                color: '#999',
            },
            fontSize: "0.75em"
        }}>

            <Link sx={{ cursor: "pointer" }} onClick={() => router.back()}>
                <table>
                    <tbody>
                        <tr>
                            <td><ArrowLeftIcon fontSize="x-small" /></td>
                            <td style={{ paddingBottom: "5px" }}>BACK</td>
                        </tr>
                    </tbody>
                </table>
            </Link>
        </Box>
    </>;
}

// BREADCRUMB CODE

// import Breadcrumbs from 'nextjs-breadcrumbs';
// import React from 'react';
// import { Box } from '@mui/material';

// export default class CustomBreadcrumb extends React.Component {
//     render() {
//         return <>
//             <Box sx={{ 
//                 mt: "40px",
//                 height: '30px', 
//                 width: '100%', 
//                 paddingTop: "10px",
//                 paddingBottom: "60px",
//                 color: '#999',
//                 textDecoration: "none",
//                 fontWeight: "bold",
//                 '& a':{
//                     textDecoration: "none",
//                     color: '#999',
//                 }
//                 }}>
//                 <Breadcrumbs
//                     // transformLabel={(n) => n.toUpperCase()+ "   |"}
//                     labelsToUppercase={true}
//                     containerStyle={{ textDecoration: "none", fontSize: "0.6em" }}
//                     listStyle={{ textDecoration: "none", padding: 0, margin: 0 }}
//                     activeItemStyle={{ display: "table-cell", color: "#cccccc", textAlign: "center", padding: "0px 10px 0 0", textDecoration: "none" }}
//                     inactiveItemStyle={{ display: "table-cell", color: "#cccccc", textAlign: "center", padding: "0px 10px 0 0", textDecoration: "none" }}
//                     visitedItemStyle={{ display: "table-cell", color: "#cccccc", textAlign: "center", padding: "0px 10px 0 0", textDecoration: "none" }}
//                     rootLabel="Home" />
//             </Box>
//         </>;
//     }
// }