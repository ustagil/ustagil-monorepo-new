import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  OnModuleInit,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientGrpc, ClientKafka } from '@nestjs/microservices';
import {
  API_ORGANIZATION_COMMAND_MS,
  API_ORGANIZATION_QUERY_MS,
} from '@ustagil/api-constant';
import {
  OrganizationGrpcService,
  OrganizationHttpCreateResponse,
  OrganizationHttpDeleteResponse,
  OrganizationHttpListResponse,
  OrganizationHttpReadResponse,
  OrganizationHttpUpdateResponse,
  OrganizationKafkaDeleteRequest,
  OrganizationKafkaDeleteResponse,
  OrganizationKafkaUpdateRequest,
  OrganizationKafkaUpdateResponse,
} from '@ustagil/typing';
import { firstValueFrom, toArray } from 'rxjs';
import {
  OrganizationHttpCreateRequestBodyDto,
  OrganizationHttpDeleteRequestParamsDto,
  OrganizationHttpListRequestQueryDto,
  OrganizationHttpReadRequestParamsDto,
  OrganizationHttpUpdateRequestBodyDto,
  OrganizationHttpUpdateRequestParamsDto,
} from './dto';

@Controller('organizations')
export class OrganizationController implements OnModuleInit {
  private organizationGrpcService: OrganizationGrpcService;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    @Inject(API_ORGANIZATION_QUERY_MS) private clientGrpc: ClientGrpc,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    @Inject(API_ORGANIZATION_COMMAND_MS) private clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.organizationGrpcService =
      this.clientGrpc.getService<OrganizationGrpcService>(
        'OrganizationService',
      );

    await this.clientKafka.connect();
  }

  @Get()
  async list(
    @Query() query: OrganizationHttpListRequestQueryDto,
  ): Promise<OrganizationHttpListResponse> {
    const organizations = await firstValueFrom(
      this.organizationGrpcService.list({ query }).pipe(toArray()),
    );

    return organizations;
  }

  @Post()
  create(
    @Body() body: OrganizationHttpCreateRequestBodyDto,
  ): OrganizationHttpCreateResponse {
    this.clientKafka.emit('organization.create', { body });
  }

  @Get(':id')
  async read(
    @Param() params: OrganizationHttpReadRequestParamsDto,
  ): Promise<OrganizationHttpReadResponse> {
    const organization = await firstValueFrom(
      this.organizationGrpcService.read({
        params,
      }),
    );

    if (!organization) throw new NotFoundException();

    return organization;
  }

  @Patch(':id')
  update(
    @Param() params: OrganizationHttpUpdateRequestParamsDto,
    @Body() body: OrganizationHttpUpdateRequestBodyDto,
  ): OrganizationHttpUpdateResponse {
    this.clientKafka.emit<
      OrganizationKafkaUpdateResponse,
      OrganizationKafkaUpdateRequest
    >('organization.update', {
      params,
      body,
    });
  }

  @Delete(':id')
  delete(
    @Param() params: OrganizationHttpDeleteRequestParamsDto,
  ): OrganizationHttpDeleteResponse {
    this.clientKafka.emit<
      OrganizationKafkaDeleteResponse,
      OrganizationKafkaDeleteRequest
    >('organization.delete', { params });
  }
}
