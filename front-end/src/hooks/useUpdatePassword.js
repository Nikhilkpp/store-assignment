export const useUpdatePassword=()=>{



    const updatePass= async({currentPass, newPass, confPass})=>{
        try {
            if(newPass!==confPass){
                alert("new passwords didn't match.")
                return;

            }
            else if(newPass.length<8 || currentPass.length<8){
                return;
            }
            else if(currentPass === newPass){
                alert("Hey buddy, why you want to change like this.")
                return;
            }


            const res = await fetch("http://localhost:3000/api/v1/users/updatepassword",{
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ currentPass,newPass,confPass}),
                credentials:"include"
            })
            const data = await res.json();
            if(data.error){
                alert(data.error)
                return;
            }
            alert("Password updated successfully, use new password to login.")
            
        } catch (error) {
            alert(error)
            
        }

    }
    return ({updatePass})
}

export default useUpdatePassword;