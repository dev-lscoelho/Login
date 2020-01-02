import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#880E4F',
                secondary: '#FFE3C9',
                accent: '#FFCE6F',
                error: '#F01945',
                warning: '#FFC107',
                info: '#03A9F4',
                success: '#4CAF50'
            }
        }
    }
});
