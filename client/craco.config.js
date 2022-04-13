module.exports = {
    style: {
        sass: {
            loaderOptions: {
                additionalData: `          
                    @import "src/assets/styles/variables.scss";  
                    @import "src/assets/styles/colors.scss";  
                    @import "src/assets/styles/mixins.scss";  
                    @import "src/assets/styles/functions.scss";
                `
            }
        }
    }
}