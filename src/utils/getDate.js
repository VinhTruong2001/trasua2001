export default function getDate() {
    const d = new Date();
    
    return `${d.getHours()} giờ ${d.getMinutes()} phút, ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
 }