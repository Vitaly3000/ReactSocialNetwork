import React from 'react'


const Contacts = ({ contactKey, contactValue }) => {
 return (
   <div>
     {contactKey}: {contactValue ? contactValue : 'Нету'}
   </div>
 );
};
export default Contacts