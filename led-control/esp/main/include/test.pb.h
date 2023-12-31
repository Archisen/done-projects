/* Automatically generated nanopb header */
/* Generated by nanopb-0.4.6 */

#ifndef PB_PROTO_FILES_TEST_PB_H_INCLUDED
#define PB_PROTO_FILES_TEST_PB_H_INCLUDED
#include <pb.h>

#if PB_PROTO_HEADER_VERSION != 40
#error Regenerate this file with the current version of nanopb generator.
#endif

/* Struct definitions */
typedef struct _SearchRequest { 
    pb_callback_t query;
    bool has_page_number;
    int32_t page_number;
    bool has_result_per_page;
    int32_t result_per_page;
} SearchRequest;


#ifdef __cplusplus
extern "C" {
#endif

/* Initializer values for message structs */
#define SearchRequest_init_default               {{{NULL}, NULL}, false, 0, false, 0}
#define SearchRequest_init_zero                  {{{NULL}, NULL}, false, 0, false, 0}

/* Field tags (for use in manual encoding/decoding) */
#define SearchRequest_query_tag                  1
#define SearchRequest_page_number_tag            2
#define SearchRequest_result_per_page_tag        3

/* Struct field encoding specification for nanopb */
#define SearchRequest_FIELDLIST(X, a) \
X(a, CALLBACK, REQUIRED, STRING,   query,             1) \
X(a, STATIC,   OPTIONAL, INT32,    page_number,       2) \
X(a, STATIC,   OPTIONAL, INT32,    result_per_page,   3)
#define SearchRequest_CALLBACK pb_default_field_callback
#define SearchRequest_DEFAULT NULL

extern const pb_msgdesc_t SearchRequest_msg;

/* Defines for backwards compatibility with code written before nanopb-0.4.0 */
#define SearchRequest_fields &SearchRequest_msg

/* Maximum encoded size of messages (where known) */
/* SearchRequest_size depends on runtime parameters */

#ifdef __cplusplus
} /* extern "C" */
#endif

#endif
