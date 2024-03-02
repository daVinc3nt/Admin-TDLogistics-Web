import axios, { AxiosResponse } from "axios";

class UsersAuthenticate {
    private baseUrl: string;
    constructor() {
        this.baseUrl = "https://tdlogistics.govt.hu/api/v1/users";
        // this.baseUrl = "http://localhost:5000/api/v1/users";
    }

    async sendOTP(phoneNumber: string, email: string): Promise<any> {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/send_otp`, {
                phone_number: phoneNumber,
                email: email,
            }, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error) {
            console.log("Error sending OTP: ", error.response.data);
            return error.response.data;
        }
    }

    async verifyOTP(phoneNumber: string, email: string, otp: string): Promise<any> {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/verify_otp`, {
                phone_number: phoneNumber,
                email: email,
                otp: otp,
            }, {
                withCredentials: true,
            },);

            const data = response.data;
            return { error: data.error, valid: data.valid, message: data.message };
        } catch (error) {
            console.log("Error verifying OTP:", error.response.data);
            return error.response.data;
        }
    }
}

class StaffsAuthenticate {
    private baseUrl: string;
    constructor() {
        this.baseUrl = "https://tdlogistics.govt.hu/api/v1/staffs";
        // this.baseUrl = "http://localhost:5000/api/v1/staffs";
    }

    async login(username: string, password: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrl}/login`, {
                username: username,
                password: password,
            }, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, valid: data.valid, message: data.message };
        } catch (error) {
            console.log("Error logging in: ", error.response.data);
            return error.response.data;
        }
    }

    async sendOTP(phone_number: string, email: string) : Promise<any> {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/send_otp`, {
                phone_number: phone_number,
                email: email,
            }, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error) {
            console.log("Error sending OTP: ", error.response.data);
            return error.response.data;
        }
    }

    async verifyOTP(phone_number: string, email: string, otp: string): Promise<any> {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/verify_otp`, {
                phone_number: phone_number,
                email: email,
                otp: otp,
            }, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error) {
            console.log("Error verify OTP", error.response.data);
            return error.response.data;
        }
    }
}

interface CreatingUserInfo {
    fullname: string,
    phone_number: string,
    email: string,
}

interface FindingUserByUserCondition {
    phone_number: string,
}

interface FindingUserByAdminConditions {
    user_id: string,
    fullname: string,
    phone_number: string,
    email: string,
}

interface UpdatingUserInfo {
    fullname: string,
    email: string,
}

interface UpdatingUserCondition {
    user_id: string,
}

class UsersOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = "https://tdlogistics.govt.hu/api/v1/users";
        // this.baseUrl = "http://localhost:5000/api/v1/users";
    }

    async findByUser(condition?: FindingUserByUserCondition) : Promise<any> {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/search`, condition, {
                withCredentials: true,
            });
            
            const data = response.data;
            return { error: data.error, data: data.data, message: data.message };
        } catch (error) {
            console.log("Error get one user: ", error.response.data);
            return error.response.data;
        }
    }

    async findByAdmin(conditions: FindingUserByAdminConditions) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/search`, conditions, {
                withCredentials: true,
            });
            
            const data = response.data;
            return { error: data.error, data: data.data, message: data.message };
        } catch (error) {
            console.log("Error get one user: ", error.response.data);
            return error.response.data;
        }
    }

    async create(info: CreatingUserInfo) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, info, {
                withCredentials: true,
            });
            
            const data = response.data;
            return { error: data.error, data: data.data, message: data.message };
        } catch (error) {
            console.log("Error create new user: ", error.response.data);
            return error.response.data;
        }
    }

    async update(info: UpdatingUserInfo, condition: UpdatingUserCondition) {
        try {
            const response: AxiosResponse = await axios.put(`${this.baseUrl}/update?user_id=${condition.user_id}`, info, {
                withCredentials: true,
            });
            
            const data = response.data;
            return { error: data.error, data: data.data, message: data.message };
        } catch (error) {
            console.log("Error create new user: ", error.response.data);
            return error.response.data;
        }
    }
}

class StaffsOperation {
    private baseUrl: string;
    constructor() {
        this.baseUrl = "https://tdlogistics.govt.hu/api/v1/staffs";
    }

    async getAuthenticatedStaffInfo() {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/get_info`, {
                withCredentials: true,
            });
            
            const data = response.data;
            return { error: data.error, data: data.data, message: data.message };
        } catch (error) {
            console.log("Error get authenticated staff information: ", error.response.data);
            return error.response.data;
        }
    }
}

interface CheckingExistAgencyCondition {
    agency_id: string,
}

interface CreatingAgencyInfo {
    username: string,
    user_password: string,
    user_fullname: string,
    user_phone_number: string,
    user_email: string,
    user_date_of_birth: string,
    user_cccd: string,
    user_province: string,
    user_district: string,
    user_town: string,
    user_detail_address: string,
    user_position: string,
    user_bin: string,
    user_bank: string,
    user_salary: number,

    type: string,
    level: string,
    postal_code: string,
    agency_name: string,
    province: string,
    district: string,
    town: string,
    detail_address: string,
    latitude: string,
    longitude: string,
    managed_wards: string,
    phone_number: string,
    email: string,
    commission_rate: string,
    bin: string,
    bank: string,
}

interface FindingAgencyByAgencyInfo {
    agencyId: string,
}

interface FindingAgencyByAdminInfo {
    agency_id: string,
    agency_name: string,
    level: string,
    province: string,
    district: string,
    town: string,
    phone_number: string,
    email: string,  
    bin: string,
    bank: string,
}

interface UpdatingAgencyInfo {
    agency_name: string,
    province: string,
    district: string,
    town: string,
    detail_address: string,
    latitude: string,
    longitude: string,
    email: string,
    phone_number: string,
    revenue: string,
    commission_rate: string,
    bin: string,
    bank: string,
}

interface UpdatingAgencyCondition {
    agency_id: string,
}

interface DeletingAgencyCondition {
    agency_id: string,
}

class AgencyOperation {
    private baseUrl: string;
    constructor() {
        this.baseUrl = "https://tdlogistics.govt.hu/api/v1/agencies";
        // this.baseUrl = "http://localhost:5000/api/v1/agencies";
    }

    async checkExist(condition: CheckingExistAgencyCondition) {
        try {
            const response = await axios.post(`${this.baseUrl}/check?agency_id=${condition.agency_id}`, {
                withCredentials: true,
            });
    
            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error) {
            console.log("Error checking exist agency: ", error.response.data);
            return error.response.data;
        }
    }

    async create(info: CreatingAgencyInfo): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrl}/create`, info, {
                withCredentials: true,
            });
    
            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error) {
            console.log("Error creating agency: ", error.response.data);
            return error.response.data;
        }
    }

    async findByAgency(conditions: FindingAgencyByAgencyInfo) {
        try {
            const response = await axios.post(`${this.baseUrl}/search`, conditions, {
                withCredentials: true,
            });
    
            const data = response.data;
            return { error: data.error, data: data.data, message: data.message };
        } catch (error) {
            console.log("Error finding agency: ", error.response.data);
            return error.response.data;
        }
    }

    async findByAdmin(conditions: FindingAgencyByAdminInfo) {
        try {
            const response = await axios.post(`${this.baseUrl}/search`, conditions, {
                withCredentials: true,
            });
    
            const data = response.data;
            return { error: data.error, data: data.data, message: data.message };
        } catch (error) {
            console.log("Error finding agency: ", error.response.data);
            return error.response.data;
        }
    }

    async update(info: UpdatingAgencyInfo, condition: UpdatingAgencyCondition) {
        try {
            const response = await axios.put(`${this.baseUrl}/update?agency_id=${condition.agency_id}`, info, {
                withCredentials: true,
            });
    
            const data = response.data;
            return { error: data.error, data: data.data, message: data.message };
        } catch (error) {
            console.log("Error finding agency: ", error.response.data);
            return error.response.data;
        }
    }

    async delete(condition: DeletingAgencyCondition) {
        try {
            const response = await axios.delete(`${this.baseUrl}/delete?agency_id=${condition.agency_id}`, {
                withCredentials: true,
            });
    
            const data = response.data;
            return { error: data.error, data: data.data, message: data.message };
        } catch (error) {
            console.log("Error finding agency: ", error.response.data);
            return error.response.data;
        }
    }
}

interface CreatingTransportPartnerByAdminInfo {
    // Representor information
    username: string,
    user_password: string,
    user_fullname: string,
    user_phone_number: string,
    user_email: string,
    user_date_of_birth: string,
    user_cccd: string,
    user_province: string,
    user_district: string,
    user_town: string,
    user_detail_address: string,
    user_position: string,
    user_bin: string,
    user_bank: string

    // Transport partner information
    agency_id: string,
    tax_code: string,
    transport_partner_name: string,
    province: string,
    district: string,
    town: string,
    detail_address: string,
    phone_number: string,
    email: string,
    bin: string,
    bank: string,
}

interface CreatingTransportPartnerByAgencyInfo {
    // Representor information
    username: string,
    user_password: string,
    user_fullname: string,
    user_phone_number: string,
    user_email: string,
    user_date_of_birth: string,
    user_cccd: string,
    user_province: string,
    user_district: string,
    user_town: string,
    user_detail_address: string,
    user_position: string,
    user_bin: string,
    user_bank: string

    // Transport partner information
    tax_code: string,
    transport_partner_name: string,
    province: string,
    district: string,
    town: string,
    detail_address: string,
    phone_number: string,
    email: string,
    bin: string,
    bank: string,
}

interface FindingTransportPartnerByTransportPartnerCondition {
    transport_partner_id: string,
}

interface FindingTransportPartnerByAdminConditions {
    transport_partner_id: string,
    tax_code: string,
    transport_partner_name: string,
    province: string,
    district: string,
    town: string,
    detail_address: string,
    phone_number: string,
    email: string,
    bin: string,
    bank: string,
}

interface UpdatingTransportPartnerInfo {
    tax_code: string,
    transport_partner_name: string,
    province: string,
    district: string,
    town: string,
    detail_address: string,
    phone_number: string,
    email: string,
    bin: string,
    bank: string,
    debit: string,
}

interface UpdatingTransportPartnerCondition {
    transport_partner_id: string,
}

interface DeletingTransportPartnerCondition {
    transport_partner_id: string,
}

class TransportPartnersOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = "https://tdlogistics.govt.hu/api/v1/transport_partners";
    }

    async createByAdmin(info: CreatingTransportPartnerByAdminInfo) {
        try {
            const response = await axios.post(`${this.baseUrl}/create`, info, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error) {
            console.log("Error creating new transport partner: ", error.response.data);
            return error.response.data;
        }
    }

    async createByAgency(info: CreatingTransportPartnerByAgencyInfo) {
        try {
            const response = await axios.post(`${this.baseUrl}/create`, info, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error) {
            console.log("Error creating new transport partner: ", error.response.data);
            return error.response.data;
        }
    }

    async findByTransportPartner(condition: FindingTransportPartnerByTransportPartnerCondition) {
        try {
            const response = await axios.post(`${this.baseUrl}/search`, condition, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, data: data.data, message: data.message };
        } catch (error) {
            console.log("Error finding transport partner: ", error.response.data);
            return error.response.data;
        }
    }

    async findByAdmin(conditions: FindingTransportPartnerByAdminConditions) {
        try {
            const response = await axios.post(`${this.baseUrl}/search`, conditions, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, data: data.data, message: data.message };
        } catch (error) {
            console.log("Error finding transport partner: ", error.response.data);
            return error.response.data;
        }
    }

    async update(info: UpdatingTransportPartnerInfo, condition: UpdatingTransportPartnerCondition) {
        try {
            const response = await axios.post(`${this.baseUrl}/update?transport_partner_id=${condition.transport_partner_id}`, info, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error) {
            console.log("Error updating transport partner: ", error.response.data);
            return error.response.data;
        }
    }

    async remove(condition: DeletingTransportPartnerCondition) {
        try {
            const response = await axios.post(`${this.baseUrl}/delete?transport_partner_id=${condition.transport_partner_id}`, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error) {
            console.log("Error deleting transport partner: ", error.response.data);
            return error.response.data;
        }
    }
}

interface CheckingExistVehicleCondition {
    vehicle_id: string,
}

interface CreatingVehicleByAdminInfo {
    agency_id: string,
    transport_partner_id: string,
    staff_id: string,
    type: string,
    license_plate: string,
    max_load: string,
}

interface CreatingVehicleByAgencyInfo {
    transport_partner_id: string,
    staff_id: string,
    type: string,
    license_plate: string,
    max_load: string,
}

interface FindingVehicleByStaffCondition {
    staff_id: string,
}

interface FindingVehicleByAdminConditions {
    vehicle_id: string,
    transport_partner_id: string,
    staff_id: string,
    type: string,
    license_plate: string,
    mass: string,
}

interface GettingOrdersContainedByVehicleCondition {
    vehicle_id: string,
}

interface UpdatingVehicleInfo {
    transport_partner_id: string,
    staff_id: string,
    type: string,
    license_plate: string,
    max_load: string,
}

interface UpdatingVehicleCondition {
    vehicle_id: string,
}

interface AddingOrdersToVehicleInfo {
    order_ids: Object,
}

interface AddingOrdersToVehicleCondition {
    vehicle_id: string,
}

interface DeletingOrdersFromVehicleInfo {
    order_ids: Object,
}

interface DeletingOrdersFromVehicleCondition {
    vehicle_id: string,
}

interface DeletingVehicleCondition {
    vehicle_id: string,
}

class Vehicle {
    private baseUrl: string;

    constructor() {
        this.baseUrl = "https://tdlogistics.govt.hu/api/v1/vehicle";
    }

    async checkExist(condition: CheckingExistVehicleCondition) {
        try {
            const response = await axios.post(`${this.baseUrl}/check?vehicle_id=${condition.vehicle_id}`, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error) {
            console.log("Error checking exist vehicle: ", error.response.data);
            return error.response.data;
        }
    }

    async createByAgency(info: CreatingVehicleByAgencyInfo) {
        try {
            const response = await axios.post(`${this.baseUrl}/create`, info, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error) {
            console.log("Error creating new vehicle: ", error.response.data);
            return error.response.data;
        }
    }

    async createByAdmin(info: CreatingVehicleByAdminInfo) {
        try {
            const response = await axios.post(`${this.baseUrl}/create`, info, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error) {
            console.log("Error creating new vehicle: ", error.response.data);
            return error.response.data;
        }
    }

    async findByStaff(condition: FindingVehicleByStaffCondition) {
        try {
            const response = await axios.post(`${this.baseUrl}/search?staff_id=${condition.staff_id}`, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error) {
            console.log("Error finding vehicle: ", error.response.data);
            return error.response.data;
        }
    }

    async findByAdmin(conditions: FindingVehicleByAdminConditions) {
        try {
            const response = await axios.post(`${this.baseUrl}/search`, conditions, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error) {
            console.log("Error finding vehicle: ", error.response.data);
            return error.response.data;
        }
    }

    async getOrders(condition: GettingOrdersContainedByVehicleCondition) {
        try {
            const response = await axios.post(`${this.baseUrl}/search_order_ids?vehicle_id=${condition.vehicle_id}`, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error) {
            console.log("Error getting orders contained by vehicle: ", error.response.data);
            return error.response.data;
        }
    }

    async update(info: UpdatingVehicleInfo, condition: UpdatingVehicleCondition) {
        try {
            const response = await axios.post(`${this.baseUrl}/update?vehicle_id=${condition.vehicle_id}`, info, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error) {
            console.log("Error getting orders contained by vehicle: ", error.response.data);
            return error.response.data;
        }
    }

    async addOrders(info: AddingOrdersToVehicleInfo, condition: AddingOrdersToVehicleCondition) {
        try {
            const response = await axios.post(`${this.baseUrl}/add_orders?vehicle_id=${condition.vehicle_id}`, info, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error) {
            console.log("Error adding orders to vehicle: ", error.response.data);
            return error.response.data;
        }
    }

    async deleteOrders(info: DeletingOrdersFromVehicleInfo, condition: DeletingOrdersFromVehicleCondition) {
        try {
            const response = await axios.post(`${this.baseUrl}/delete_orders?vehicle_id=${condition.vehicle_id}`, info, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error) {
            console.log("Error deleting orders from vehicle: ", error.response.data);
            return error.response.data;
        }
    }

    async deleteVehicle(condition: DeletingVehicleCondition) {
        try {
            const response = await axios.post(`${this.baseUrl}/delete?vehicle_id=${condition.vehicle_id}`, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error) {
            console.log("Error deleting vehicle: ", error.response.data);
            return error.response.data;
        }
    }
}

export {
    UsersAuthenticate,
    StaffsAuthenticate,
    UsersOperation,
    AgencyOperation,
    TransportPartnersOperation,
}