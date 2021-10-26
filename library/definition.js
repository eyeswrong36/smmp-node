

exports.command_ids = {
    'generic_nack'          : 0x80000000,
    'bind_receiver'         : 0x00000001,
    'bind_receiver_resp'    : 0x80000001,
    'bind_transmitter'      : 0x00000002,
    'bind_transmitter_resp' : 0x80000002,
    'query_sm'              : 0x00000003,
    'query_sm_resp'         : 0x80000003,
    'submit_sm'             : 0x00000004,
    'submit_sm_resp'        : 0x80000004,
    'deliver_sm'            : 0x00000005,
    'deliver_sm_resp'       : 0x80000005,
    'unbind'                : 0x00000006,
    'unbind_resp'           : 0x80000006,
    'replace_sm'            : 0x00000007,
    'replace_sm_resp'       : 0x80000007,
    'cancel_sm'             : 0x00000008,
    'cancel_sm_resp'        : 0x80000008,
    'bind_transceiver'      : 0x00000009,
    'bind_transceiver_resp' : 0x80000009,
    'outbind'               : 0x0000000B,
    'enquire_link'          : 0x00000015,
    'enquire_link_resp'     : 0x80000015,
    'submit_multi'          : 0x00000021,
    'submit_multi_resp'     : 0x80000021,
    'alert_notification'    : 0x00000102,
    'data_sm'               : 0x00000103,
    'data_sm_resp'          : 0x80000103
};

// Reverse command_ids
exports.command_ids_val = {};
for (let cmdid in exports.command_ids) {
    exports.command_ids_val[ exports.command_ids[cmdid] ] = cmdid;
};


exports.command_status = {
    "ESME_ROK"              : 0x00000000,
    "ESME_RINVMSGLEN"       : 0x00000001,
    "ESME_RINVCMDLEN"       : 0x00000002,
    "ESME_RINVCMDID"        : 0x00000003,
    "ESME_RINVBNDSTS"       : 0x00000004,
    "ESME_RALYBND"          : 0x00000005,
    "ESME_RINVPRTFLG"       : 0x00000006,
    "ESME_RINVREGDLVFLG"    : 0x00000007,
    "ESME_RSYSERR"          : 0x00000008,
    "ESME_RINVSRCADR"       : 0x0000000A,
    "ESME_RINVDSTADR"       : 0x0000000B,
    "ESME_RINVMSGID"        : 0x0000000C,
    "ESME_RBINDFAIL"        : 0x0000000D,
    "ESME_RINVPASWD"        : 0x0000000E,
    "ESME_RINVSYSID"        : 0x0000000F,
    "ESME_RCANCELFAIL"      : 0x00000011,
    "ESME_RREPLACEFAIL"     : 0x00000013,
    "ESME_RMSGQFUL"         : 0x00000014,
    "ESME_RINVSERTYP"       : 0x00000015,
    "ESME_RINVNUMDESTS"     : 0x00000033,
    "ESME_RINVDLNAME"       : 0x00000034,
    "ESME_RINVDESTFLAG"     : 0x00000040,
    "ESME_RINVSUBREP"       : 0x00000042,
    "ESME_RINVESMCLASS"     : 0x00000043,
    "ESME_RCNTSUBDL"        : 0x00000044,
    "ESME_RSUBMITFAIL"      : 0x00000045,
    "ESME_RINVSRCTON"       : 0x00000048,
    "ESME_RINVSRCNPI"       : 0x00000049,
    "ESME_RINVDSTTON"       : 0x00000050,
    "ESME_RINVDSTNPI"       : 0x00000051,
    "ESME_RINVSYSTYP"       : 0x00000053,
    "ESME_RINVREPFLAG"      : 0x00000054,
    "ESME_RINVNUMMSGS"      : 0x00000055,
    "ESME_RTHROTTLED"       : 0x00000058,
    "ESME_RINVSCHED"        : 0x00000061,
    "ESME_RINVEXPIRY"       : 0x00000062,
    "ESME_RINVDFTMSGID"     : 0x00000063,
    "ESME_RX_T_APPN"        : 0x00000064,
    "ESME_RX_P_APPN"        : 0x00000065,
    "ESME_RX_R_APPN"        : 0x00000066,
    "ESME_RQUERYFAIL"       : 0x00000067,
    "ESME_RINVOPTPARSTREAM" : 0x000000C0,
    "ESME_ROPTPARNOTALLWD"  : 0x000000C1,
    "ESME_RINVPARLEN"       : 0x000000C2,
    "ESME_RMISSINGOPTPARAM" : 0x000000C3,
    "ESME_RINVOPTPARAMVAL"  : 0x000000C4,
    "ESME_RDELIVERYFAILURE" : 0x000000FE,
    "ESME_RUNKNOWNERR"      : 0x000000FF
};

// Reverse command_ids
exports.command_status_val = {};
for (let cmdsta in exports.command_status) {
    exports.command_status_val[ exports.command_status[cmdsta] ] = cmdsta;
};


exports.command_status_det = {
    ESME_ROK:               { value: 0x00000000, description: "No Error" },
    ESME_RINVMSGLEN:        { value: 0x00000001, description: "Invalid message length" },
    ESME_RINVCMDLEN:        { value: 0x00000002, description: "Invalid command length" },
    ESME_RINVCMDID:         { value: 0x00000003, description: "Invalid command ID" },
    ESME_RINVBNDSTS:        { value: 0x00000004, description: "Incorrect bind status for given command" },
    ESME_RALYBND:           { value: 0x00000005, description: "ESME already in bound state" },
    ESME_RINVPRTFLG:        { value: 0x00000006, description: "Invalid priority flag" },
    ESME_RINVREGDLVFLG:     { value: 0x00000007, description: "Invalid registered delivery flag" },
    ESME_RSYSERR:           { value: 0x00000008, description: "System error" },
    ESME_RINVSRCADR:        { value: 0x0000000A, description: "Invalid source address" },
    ESME_RINVDSTADR:        { value: 0x0000000B, description: "Invalid destination address" },
    ESME_RINVMSGID:         { value: 0x0000000C, description: "Invalid message ID" },
    ESME_RBINDFAIL:         { value: 0x0000000D, description: "Bind failed" },
    ESME_RINVPASWD:         { value: 0x0000000E, description: "Invalid password" },
    ESME_RINVSYSID:         { value: 0x0000000F, description: "Invalid system ID" },
    ESME_RCANCELFAIL:       { value: 0x00000011, description: "Cancel SM failed" },
    ESME_RREPLACEFAIL:      { value: 0x00000013, description: "Replace SM failed" },
    ESME_RMSGQFUL:          { value: 0x00000014, description: "Message queue full" },
    ESME_RINVSERTYP:        { value: 0x00000015, description: "Invalid service type" },
    ESME_RINVNUMDESTS:      { value: 0x00000033, description: "Invalid number of destinations" },
    ESME_RINVDLNAME:        { value: 0x00000034, description: "Invalid distribution list name" },
    ESME_RINVDESTFLAG:      { value: 0x00000040, description: "Invalid destination flag" },
    ESME_RINVSUBREP:        { value: 0x00000042, description: "Invalid 'submit with replace' request" },
    ESME_RINVESMCLASS:      { value: 0x00000043, description: "Invalid esm_class field" },
    ESME_RCNTSUBDL:         { value: 0x00000044, description: "Cannot submit to distribution list" },
    ESME_RSUBMITFAIL:       { value: 0x00000045, description: "submit_sm or submit_multi failed" },
    ESME_RINVSRCTON:        { value: 0x00000048, description: "Invalid source address TON" },
    ESME_RINVSRCNPI:        { value: 0x00000049, description: "Invalid source address NPI" },
    ESME_RINVDSTTON:        { value: 0x00000050, description: "Invalid destination address TON" },
    ESME_RINVDSTNPI:        { value: 0x00000051, description: "Invalid destination address NPI" },
    ESME_RINVSYSTYP:        { value: 0x00000053, description: "Invalid system type" },
    ESME_RINVREPFLAG:       { value: 0x00000054, description: "Invalid replace_if_present flag" },
    ESME_RINVNUMMSGS:       { value: 0x00000055, description: "Invalid number of messages" },
    ESME_RTHROTTLED:        { value: 0x00000058, description: "Throttling error" },
    ESME_RINVSCHED:         { value: 0x00000061, description: "Invalid scheduled delivery time" },
    ESME_RINVEXPIRY:        { value: 0x00000062, description: "Invalid message validity period" },
    ESME_RINVDFTMSGID:      { value: 0x00000063, description: "Predefined message invalid or not found" },
    ESME_RX_T_APPN:         { value: 0x00000064, description: "ESME receiver temporary app error code" },
    ESME_RX_P_APPN:         { value: 0x00000065, description: "ESME receiver permanent app error code" },
    ESME_RX_R_APPN:         { value: 0x00000066, description: "ESME receiver reject message error code" },
    ESME_RQUERYFAIL:        { value: 0x00000067, description: "query_sm request failed" },
    ESME_RINVOPTPARSTREAM:  { value: 0x000000C0, description: "Error in optional part of PDU body" },
    ESME_ROPTPARNOTALLWD:   { value: 0x000000C1, description: "Optional parameter not allowed" },
    ESME_RINVPARLEN:        { value: 0x000000C2, description: "Invalid parameter length" },
    ESME_RMISSINGOPTPARAM:  { value: 0x000000C3, description: "Expected optional parameter missing" },
    ESME_RINVOPTPARAMVAL:   { value: 0x000000C4, description: "Invalid optional parameter value" },
    ESME_RDELIVERYFAILURE:  { value: 0x000000FE, description: "Delivery failure" },
    ESME_RUNKNOWNERR:       { value: 0x000000FF, description: "Unknown error" }
};

exports.pdu_format = {
    bind_transmitter : 
    [
        { name: "system_id", type: "c-string", min: 1, max: 16, value: "", require: true },
        { name: "password", type: "c-string", min: 1, max: 9, value: "", require: true },
        { name: "system_type", type: "c-string", min: 1, max: 13, value: "" },
        { name: "interface_version", type: "int", bytes: 1, value: 0x34 },
        { name: "addr_ton", type: "int", bytes: 1, value: 0 },
        { name: "addr_npi", type: "int", bytes: 1 , value: 0 },
        { name: "address_range", type: "c-string", min: 1, max: 41, value: "" }
    ],

    bind_transmitter_resp : 
    [
        { name: "system_id", type: "c-string", min: 1, max: 16, value: "" }
    ],

    bind_receiver :
    [
        { name: "system_id", type: "c-string", min: 1, max: 16, value: "" },
        { name: "password", type: "c-string", min: 1, max: 9, value: "" },
        { name: "system_type", type: "c-string", min: 1, max: 13, value: "" },
        { name: "interface_version", type: "int", bytes: 1, value: 0 },
        { name: "addr_ton", type: "int", bytes: 1, value: 0 },
        { name: "addr_npi", type: "int", bytes: 1, value: 0 },
        { name: "address_range", type: "c-string", min: 1, max: 13, value: "" },
    ],

    bind_receiver_resp :
    [
        { name: "system_id", type: "c-string", min: 1, max: 16, value: "" }
    ],

    bind_transceiver : 
    [
        { name: "system_id", type: "c-string", min: 1, max: 16, value: "" },
        { name: "password", type: "c-string", min: 1, max: 9, value: "" },
        { name: "system_type", type: "c-string", min: 1, max: 13, value: "" },
        { name: "interface_version", type: "int", bytes: 1, value: 0 },
        { name: "addr_ton", type: "int", bytes: 1, value: 0 },
        { name: "addr_npi", type: "int", bytes: 1, value: 0 },
        { name: "address_range", type: "c-string", min: 1, max: 13, value: "" },
    ],

    bind_transceiver_resp :
    [
        { name: "system_id", type: "c-string", min: 1, max: 16, value: "" }
    ],
    
    outbind :
    [
        { name: "system_id", type: "c-string", min: 1, max: 16, value: "" },
        { name: "password", type: "c-string", min: 1, max: 9, value: "" },
    ],

    unbind : 
    [

    ],

    unbind_resp : 
    [

    ],

    enquire_link : 
    [

    ],

    enquire_link_resp : 
    [

    ],

    generic_nack : 
    [

    ],

    submit_sm : 
    [
        { name: "service_type", type: "c-string", min: 1, max: 6, value: "" },
        { name: "source_addr_ton", type: "int", bytes: 1, value: 5 },
        { name: "source_addr_npi", type: "int", bytes: 1, value: 0 },
        { name: "source_addr", type: "c-string", min: 1, max: 21, value: "", require : true },
        { name: "dest_addr_ton", type: "int", bytes: 1, value: 0 },
        { name: "dest_addr_npi", type: "int", bytes: 1, value: 1 },
        { name: "destination_addr", type: "c-string", min: 1, max: 21, value: "" },
        { name: "esm_class", type: "int", bytes: 1, value: 0 },
        { name: "protocol_id", type: "int", bytes: 1, value: 0 },
        { name: "priority_flag", type: "int", bytes: 1, value: 0 },
        { name: "schedule_delivery_time", type: "c-string", length: 17, value: "" },
        { name: "validity_period", type: "c-string", length: 17, value: "" },
        { name: "registered_delivery", type: "int", bytes: 1, value: 0 },
        { name: "replace_if_present_flag", type: "int", bytes: 1, value: 0 },
        { name: "data_coding", type: "int", bytes: 1, value: 0 },
        { name: "sm_default_msg_id", type: "int", bytes: 1, value: 0 },
        { name: "sm_length", type: "int", bytes: 1, value: 0 },
        { name: "short_message", type: "string", min: 1, max: 254, value: "", require : true },
    ],

    submit_sm_resp :
    [
        { name: "message_id", type: "c-string", min: 1, max: 65, value: "" },
    ],

    submit_multi :
    [
        { name: "service_type", type: "c-string", min: 1, max: 6, value: "" },
        { name: "source_addr_ton", type: "int", bytes: 1, value: 5 },
        { name: "source_addr_npi", type: "int", bytes: 1, value: 0 },
        { name: "source_addr", type: "c-string", min: 1, max: 21, value: "" },
        { name: "number_of_dests", type: "int", bytes: 1, value: 1 },
        { name: "dest_address", type: "var", min: 4, max: 24,
            value: [
                { name: "dest_flag", type: "int", bytes: 1, value: 1 },
                { name: "dest_addr_ton", type: "int", bytes: 1, value: 0 },
                { name: "dest_addr_npi", type: "int", bytes: 1, value: 1 },
                { name: "destination_addr", type: "c-string", min: 1, max: 21, value: "" }
            ]
        },
        { name: "esm_class", type: "int", bytes: 1, value: 0 },
        { name: "protocol_id", type: "int", bytes: 1, value: 0 },
        { name: "priority_flag", type: "int", bytes: 1, value: 0 },
        { name: "schedule_delivery_time", type: "c-string", length: 17, value: "" },
        { name: "validity_period", type: "c-string", length: 17, value: "" },
        { name: "registered_delivery", type: "int", bytes: 1, value: 0 },
        { name: "replace_if_present_flag", type: "int", bytes: 1, value: 0 },
        { name: "data_coding", type: "int", bytes: 1, value: 0 },
        { name: "sm_default_msg_id", type: "int", bytes: 1, value: 0 },
        { name: "sm_length", type: "int", bytes: 1, value: 0 },
        { name: "short_message", type: "string", min: 1, max: 254, value: "" },
    ],

    submit_multi_resp :
    [
        { name: "message_id", type: "c-string", min: 1, max: 65, value: "" },
        { name: "no_unsuccess", type: "int", bytes: 1, value: 1 },
        { name: "unsuccess_sme", type: "var", min: 7, max: 27,
            value: [
                { name: "dest_addr_ton", type: "int", bytes: 1, value: 1 },
                { name: "dest_addr_npi", type: "int", bytes: 1, value: 0 },
                { name: "destination_addr", type: "c-string", min: 1, max: 21, value: "" },
                { name: "error_status_code", type: "int", bytes: 4, value: 0 }
            ]
        }
    ],

    deliver_sm :
    [
        { name: "service_type", type: "c-string", min: 1, max: 6, value: "" },
        { name: "source_addr_ton", type: "int", bytes: 1, value: 1 },
        { name: "source_addr_npi", type: "int", bytes: 1, value: 0 },
        { name: "source_addr", type: "c-string", min: 1, max: 21 },
        { name: "dest_addr_ton", type: "int", bytes: 1, value: 1 },
        { name: "dest_addr_npi", type: "int", bytes: 1, value: 0 },
        { name: "destination_addr", type: "c-string", min: 1, max: 21, value: "" },
        { name: "esm_class", type: "int", bytes: 1, value: 0 },
        { name: "protocol_id", type: "int", bytes: 1, value: 0 },
        { name: "priority_flag", type: "int", bytes: 1, value: 0 },
        { name: "schedule_delivery_time", type: "c-string", length: 17, value: "" },
        { name: "validity_period", type: "c-string", length: 17, value: "" },
        { name: "registered_delivery", type: "int", bytes: 1, value: 0 },
        { name: "replace_if_present_flag", type: "int", bytes: 1, value: 0 },
        { name: "data_coding", type: "int", bytes: 1, value: 0 },
        { name: "sm_default_msg_id", type: "int", bytes: 1, value: 0 },
        { name: "sm_length", type: "int", bytes: 1, value: 0 },
        { name: "short_message", type: "string", min: 1, max: 254, value: "" },
    ],

    deliver_sm_resp : 
    [
        { name: "message_id", type: "c-string", min: 1, max: 65, value: "" },
    ],

    data_sm : 
    [
        { name: "service_type", type: "c-string", min: 1, max: 6, value: "" },
        { name: "source_addr_ton", type: "int", bytes: 1, value: 1 },
        { name: "source_addr_npi", type: "int", bytes: 1, value: 0 },
        { name: "source_addr", type: "c-string", min: 1, max: 21, value: "" },
        { name: "dest_addr_ton", type: "int", bytes: 1, value: 1 },
        { name: "dest_addr_npi", type: "int", bytes: 1, value: 0 },
        { name: "destination_addr", type: "c-string", min: 1, max: 21, value: "" },
        { name: "esm_class", type: "int", bytes: 1, value: 0 },
        { name: "registered_delivery", type: "int", bytes: 1, value: 0 },
        { name: "data_coding", type: "int", bytes: 1, value: 0 },
    ],

    data_sm_resp :
    [
        { name: "message_id", type: "c-string", min: 1, max: 65, value: "" }
    ],

    query_sm :
    [
        { name: "message_id", type: "c-string", min: 1, max: 65, value: "" },
        { name: "source_addr_ton", type: "int", bytes: 1, value: 1 },
        { name: "source_addr_npi", type: "int", bytes: 1, value: 0 },
        { name: "source_addr", type: "c-string", min: 1, max: 21, value: "" },
    ],

    query_sm_resp :
    [
        { name: "message_id", type: "c-string", min: 1, max: 65, value: "" },
        { name: "final_date", type: "c-string", length: 17, value: "" },
        { name: "message_state", type: "int", bytes: 1, value: 0 },
        { name: "error_code", type: "int", bytes: 1, value: 0 },
    ],

    cancel_sm : 
    [
        { name: "service_type", type: "c-string", min: 1, max: 6, value: "" },
        { name: "message_id", type: "c-string", min: 1, max: 65, value: "" },
        { name: "source_addr_ton", type: "int", bytes: 1, value: 1 },
        { name: "source_addr_npi", type: "int", bytes: 1, value: 0 },
        { name: "source_addr", type: "c-string", min: 1, max: 21, value: "" },
        { name: "dest_addr_ton", type: "int", bytes: 1, value: 1 },
        { name: "dest_addr_npi", type: "int", bytes: 1, value: 0 },
        { name: "destination_addr", type: "c-string", min: 1, max: 21, value: "" },
    ],

    cancel_sm_resp : 
    [

    ],

    replace_sm :
    [
        { name: "message_id", type: "c-string", min: 1, max: 65, value: "" },
        { name: "source_addr_ton", type: "int", bytes: 1, value: 1 },
        { name: "source_addr_npi", type: "int", bytes: 1, value: 0 },
        { name: "source_addr", type: "c-string", min: 1, max: 21, value: "" },
        { name: "schedule_delivery_time", type: "c-string", length: 17, value: "" },
        { name: "validity_period", type: "c-string", length: 17, value: "" },
        { name: "registered_delivery", type: "int", bytes: 1, value: 0 },
        { name: "sm_default_msg_id", type: "int", bytes: 1, value: 0 },
        { name: "sm_length", type: "int", bytes: 1, value: 0 },
        { name: "short_message", type: "string", min: 1, max: 254, value: "" },
    ],

    replace_sm_resp : 
    [

    ],

    alert_notification :
    [
        { name: "source_addr_ton", type: "int", bytes: 1, value: 1 },
        { name: "source_addr_npi", type: "int", bytes: 1, value: 0 },
        { name: "source_addr", type: "c-string", min: 1, max: 65 },
        { name: "esme_addr_ton", type: "int", bytes: 1, value: 1 },
        { name: "esme_addr_npi", type: "int", bytes: 1, value: 0 },
        { name: "esme_addr", type: "c-string", min: 1, max: 65, value: "" },
    ]
    
};