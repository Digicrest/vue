<template>
    <v-dialog max-width="600px" v-model="dialogIsOpen">
        <v-btn flat slot="activator" class="success">Add New Project</v-btn>
        <v-card>
            <v-card-title>
                <h2>Add a New Project</h2>
            </v-card-title>

            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Title" v-model="title" prepend-icon="folder" :rules="inputRules"></v-text-field>
                    <v-textarea label="Information" v-model="content" prepend-icon="edit" :rules="inputRules"></v-textarea>

                    <v-menu>
                        <v-text-field :rules="inputRules" :value="formattedDate" slot="activator" label="Due Date" prepend-icon="date_range"></v-text-field>
                        <v-date-picker v-model="due"></v-date-picker>
                    </v-menu>

                    <v-spacer></v-spacer>

                    <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="currentlySubmitting">Add Project</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import format from 'date-fns/format';
import db from '@/firebaseConfig';

export default {
    data() {
        return {
            title: "",
            content: "",
            due: null,
            inputRules: [
                v => v && v.length >= 3 || 'Minimum Length is 3 Characters'
            ],
            currentlySubmitting: false,
            dialogIsOpen: false
        }
    },
    methods: {
        submit() {
            if(this.$refs.form.validate()) {
                const project = {
                    title: this.title,
                    content: this.content,
                    due: format(this.due, 'Do MMM YYYY'),
                    person: 'Digicrest',
                    status: 'ongoing'
                };
                this.currentlySubmitting = true;
                db.collection('projects').add(project).then(() => {
                    this.currentlySubmitting = false;
                    this.dialogIsOpen = false;
                    this.$emit("projectAdded", project.person);
                })
                this.$refs.form.reset();
            }
        }
    },
    computed: {
        formattedDate() {
            if (this.due) {
                return format(this.due, 'Do MMM YYYY')
            }
            return null;
        }
    }
}
</script>

