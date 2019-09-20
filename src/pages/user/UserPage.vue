<template>
	<div class="col-md-12">
		<h3>User List</h3>
		<hr />
		<button class="btn btn-info mb-3 float-right" @click="addClick()">Add</button>
		<div class="table-responsive mb-3">
			<table class="table table-bordered bg-white mb-0">
				<thead>
					<tr>
						<th>ID</th>
						<th>Photo</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th class="text-center">Action</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="users.items">
						<tr v-for="user in users.items.data">
							<td>ID #{{user.id.pad(3)}}</td>
							<td class="text-center"> 
								<v-lazy-image class="user-photo" :src="user.avatar" src-placeholder="/src/img/user-placeholder.png" />
							</td>
							<td>{{user.first_name}}</td>
							<td>{{user.last_name}}</td>
							<td class="text-center">
								<a @click="editClick(user)" class="text-info"><font-awesome-icon icon="edit" /></a>
								<a @click="deleteClick(user.id)" class="text-danger"><font-awesome-icon icon="trash" /></a>
							</td>
						</tr>
					</template>
					<template v-if="!users.items">
						<tr>
							<td colspan="5" class="text-center">
								<font-awesome-icon icon="spinner" pulse /><em v-if="users.loading"> Loading users...</em>
								<span v-if="!users.loading">No record/s found.</span>
							</td>
						</tr>
					</template>
				</tbody>
			</table>
		</div>

		<template v-if="users.items">
			<paginate
	    		v-model="pagination.page"
	    		align="center"
			    :page-count="users.items.total_pages ? users.items.total_pages : 0"
			    :page-range="pagination.perPage"
			    :margin-pages="2"
			    :click-handler="changePage"
			    :prev-text="'Prev'"
			    :next-text="'Next'"
			    :container-class="'pagination'"
			    :page-class="'page-item'"
			    :page-link-class="'page-link'"
			    :prev-class="'page-item'"
			    :prev-link-class="'page-link'"
			    :next-class="'page-item'"
			    :next-link-class="'page-link'">
		  	</paginate>
		</template>
	</div>
</template>

<script>
	import { mapState, mapActions } from "vuex";

	export default {
		data() {
		    return {
		      	pagination: { 
		      		page: 1,
			      	perPage: 5
			  	}
		    }
	  	},
		computed: {
			...mapState({
				users: state => state.users.all
			})
		},
		created() {
			this.getAllUsers(this.pagination);
		},
		methods: {
			...mapActions("users", {
				getAllUsers: "getAll",
				deleteUser: "delete",
				addUser: "add",
				editUser: "edit"
			}),
		  	changePage: function() {
		    	this.getAllUsers(this.pagination);
		    },
		    addClick: function(){
		    	this.addUser();
		    },
		    editClick: function(user){
		    	this.editUser(user);
		    },
		    deleteClick: function(id){
		    	this.deleteUser(id).then(() => {
					this.getAllUsers(this.pagination);
		    	});
		    }
		}
	};
</script>