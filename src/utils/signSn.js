export function signSn( googleSignIn, axios, Toast) {
    googleSignIn().then((result) => {
        const user = result?.user;
  
        const userBody = {
          name: user?.displayName,
          email: user?.email,
        };
        axios
          .post("/auth/signin", userBody)
          .then(() => {
            Toast.fire({
              icon: "success",
              title: "Signed in successfully",
            });
          })
          .catch(() => {
            Toast.fire({
              icon: "error",
              title: "Signed in failed",
            });
          });
      });
    
}