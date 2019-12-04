<template>
    <div id="header">
        <nav class="navbar">
            <span class="navbar-brand mb-0 h1">Strategies Editor</span>
            <form class="form-inline my-2 my-lg-0">
                <button class="btn btn-primary my-2 my-sm-0" type="button" @click="saveState();">Sauver</button>
                <b-dropdown id="dropdown-1" right variant="light" toggle-class="text-decoration-none" no-caret>
                    <template v-slot:button-content>
                        <i class="fas fa-ellipsis-h"></i>
                    </template>
                    <b-dropdown-item>À propos</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item variant="danger" @click="deleteState()">Supprimer cette stratégie</b-dropdown-item>
                </b-dropdown>
            </form>
        </nav>
    </div>
</template>
<script>
export default {
    name: 'app-header',
    methods: {
        saveState() {
            this.$parent.$refs.main.saveState();
            this.$bvToast.toast('Votre stratégie est sauvegardée', {
                title: 'Strategie',
                autoHideDelay: 2500,
            });
        },
        deleteState() {
            this.$parent.$refs.main.deleteState();
            this.$bvToast.toast('Votre stratégie est effacée', {
                title: 'Strategie',
                autoHideDelay: 2500,
                variant: 'danger'
            });
        }
    }
}
</script>
<style lang="scss" scoped>
#header {
    background: white;
    position: absolute;
    z-index: 10;
    top: 0px;
    left: 0px;
    width:100%;
    height: 56px;
    border-bottom: 1px solid #CED4DA;
    .b-dropdown {
        margin: 0px 10px !important;
    }
}
</style>