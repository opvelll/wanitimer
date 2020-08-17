<template>
  <div class="home">
    <div class="d-flex flex-column align-items-center">
      <amplify-connect :query="listTodosQuery">
        <template slot-scope="{ loading, data, errors }">
          <div v-if="loading">Loading...</div>

          <div v-else-if="errors.length > 0"></div>

          <div v-else-if="data" class="d-flex flex-column align-items-center">
            <div v-if="data.listPlans.items.length <= 0">
              <!-- 新規追加フォーム -->
              <amplify-connect :mutation="createPlanMutation" @done="onCreateFinished">
                <template slot-scope="{ loading, mutate }">
                  <div class="row flex-column align-items-center">
                    <b-form class>
                      <b-form-group label="開始日:" label-for="example-datepicker" label-cols="3">
                        <b-form-datepicker id="example-datepicker" v-model="form.startDate" class></b-form-datepicker>
                      </b-form-group>

                      <b-form-group label="期間:" label-for="sb-inline" label-cols="3 ">
                        <b-form-spinbutton
                          id="sb-inline"
                          v-model="form.settingDays"
                          min="0"
                          :max="2 ** 31 - 1"
                          inline
                        ></b-form-spinbutton>
                      </b-form-group>

                      <b-button variant="primary" :disabled="loading" @click="mutate">登録</b-button>
                    </b-form>
                  </div>
                </template>
              </amplify-connect>
            </div>
            <div
              class="d-flex flex-column align-items-center"
              v-for="item in data.listPlans.items"
              v-bind:key="item.id"
              @click="onClickPlan(item)"
              style="cursor: pointer"
            >
              <!-- <div class="d-flex">
                <div class="mr-3 text-muted">開始日: {{ item.startDate | moment("LL") }}</div>
                <div class="mr-3 text-muted">期間: {{ item.settingDays }} 日</div>
              </div>-->
              <div>{{ elapsedDays(item.startDate) }} 日目</div>
              <div>今日: {{new Date() | moment("LL")}}</div>
              <div>
                死まであと
                {{ remainingDays(item.startDate, item.settingDays) }} 日
                <span
                  v-if="isOver(item.startDate, item.settingDays)"
                >[ 終了済み ]</span>
              </div>
            </div>
          </div>
        </template>
      </amplify-connect>
      <!-- 変更フォーム -->
      <amplify-connect
        :mutation="updatePlanMutation"
        @done="onCreateFinished"
        v-if="isViewUpdateForm"
      >
        <template slot-scope="{ loading, mutate }">
          <div class="row flex-column align-items-center">
            <b-form class="col">
              <b-form-group label="開始日:" label-for="example-datepicker" label-cols="3">
                <b-form-datepicker id="example-datepicker" v-model="form.startDate" class></b-form-datepicker>
              </b-form-group>

              <b-form-group label="期間:" label-for="sb-inline" label-cols="3">
                <b-form-spinbutton
                  id="sb-inline"
                  v-model="form.settingDays"
                  min="0"
                  :max="2 ** 31 - 1"
                  inline
                ></b-form-spinbutton>
              </b-form-group>

              <b-button :disabled="loading" @click="mutate">更新</b-button>
            </b-form>
          </div>
        </template>
      </amplify-connect>
    </div>
  </div>
</template>

<script>
import { updatePlan, createPlan } from "../graphql/mutations";
import { listPlans } from "../graphql/queries";
import * as moment from "moment/moment";

export default {
  data() {
    return {
      form: {
        id: "",
        startDate: moment().format("YYYY-MM-DD"),
        settingDays: 100,
      },
      isViewUpdateForm: false,
    };
  },
  methods: {
    onCreateFinished() {
      //console.log("Todo created!");
      this.$router.go({ path: this.$router.currentRoute.path, force: true });
    },
    // 経過日数
    elapsedDays(startDate) {
      //console.log(moment.unix(startDate).format("LL"));
      return moment(new Date()).diff(moment.unix(startDate), "days");
    },
    // 残り日数
    remainingDays(startDate, settingDays) {
      return moment
        .unix(startDate)
        .add(settingDays, "day")
        .diff(new Date(), "days");
    },
    // 終了済みか
    isOver(startDate, settingDays) {
      return moment().isAfter(
        moment.unix(startDate).add(settingDays, "day"),
        "day"
      );
    },

    onClickPlan(item) {
      this.isViewUpdateForm = true;
      this.form.id = item.id;
      this.form.startDate = moment.unix(item.startDate).format("YYYY-MM-DD");
      this.form.settingDays = item.settingDays;
    },
  },
  computed: {
    updatePlanMutation() {
      const value = {
        input: {
          id: this.form.id,
          startDate: moment(this.form.startDate, "YYYY-MM-DD").unix(),
          settingDays: this.form.settingDays,
        },
      };
      // console.log(value);
      return this.$Amplify.graphqlOperation(updatePlan, value);
    },
    createPlanMutation() {
      const value = {
        input: {
          startDate: moment(this.form.startDate, "YYYY-MM-DD").unix(),
          settingDays: this.form.settingDays,
        },
      };
      return this.$Amplify.graphqlOperation(createPlan, value);
    },
    listTodosQuery() {
      return this.$Amplify.graphqlOperation(listPlans);
    },
  },
};
</script>
